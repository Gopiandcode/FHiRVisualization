module.exports = (env, router) => {
    const CompanyAssociations = require('../../db/models/companyAssociations');
    const Company = require('../../db/models/company');
    const sanitizeError = require('../../sanitizeError');
    const ObjectId = require('mongoose').Types.ObjectId;

    router.get('/associations', (req, res) => {
        // TODO: return associations
        // get user -> user._id, return data.populate().association
        CompanyAssociations.findOne({
            user: req.user._id
        }).populate('company').exec((err, association) => {
            if (err) {
                return res.status(400).json(sanitizeError(env, err));
            }

            if (!association) {
                association = new CompanyAssociations({
                    user: req.user._id,
                    company: []
                });
                association.save((err, saved) => {
                    if (err) {
                        return res.status(400).json(sanitizeError(env, err));
                    }
                    return res.status(200).json(saved.company);
                });
            } else {
                let companies = association.company.map((company) => {
                    return {
                        domain: company.domain,
                        name: company.name
                    };
                });
                return res.status(200).json(companies);
            }
        });
    });

    router.post('/associations', (req, res) => {
        const {domain} = req.body;
        // TODO: store associations
        // find company with id, check not in associations
        if (!domain) {
            return res.status(400).json({error: "INCOMPLETE_PARAMETERS"});
        }


        Company.findOne({domain}, (err, company) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (!company)
                return res.status(404).json({error: "RESOURCE_NOT_FOUND"});
            CompanyAssociations.findOne({user: req.user._id}, (err, association) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                if (!association) {
                    association = new CompanyAssociations({
                        user: req.user._id,
                        company: [company._id]
                    });
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        return res.status(200).json(saved.company);
                    });
                } else {


                    // Mongoose Check if objectId exists in array
                    // Reference: https://stackoverflow.com/questions/19737408/mongoose-check-if-objectid-exists-in-an-array
                    if (association.company.some((doc) => doc.equals(company._id))) {
                        return res.status(400).json({error: "COMPANY_ALREADY_ASSOCIATED"});
                    }
                    association.company.push(company._id);
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        Company.find({
                            '_id': {
                                $in: association.company.map(id => ObjectId(id))
                            }
                        }, (err, companies) => {
                            if (err) {
                                return res.status(400).json(sanitizeError(env, err));
                            }

                            let result = companies.map((company) => {
                                return {
                                    domain: company.domain,
                                    name: company.name
                                };
                            });
                            return res.status(200).json(result);
                        });
                    });
                }
            });
        });
    });

    router.delete('/associations', (req, res) => {
        const {domain} = req.body;
        // TODO: remove associations
        // find company with id
        if (!domain) {
            return res.status(400).json({error: "INCOMPLETE_PARAMETERS"});
        }


        Company.findOne({domain}, (err, company) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (!company)
                return res.status(404).json({error: "RESOURCE_NOT_FOUND"});
            CompanyAssociations.findOne({user: req.user._id}, (err, association) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                if (!association) {
                    association = new CompanyAssociations({
                        user: req.user._id,
                        company: []
                    });
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        return res.status(200).json(saved.company);
                    });
                } else {


                    // Mongoose Check if objectId exists in array
                    // Reference: https://stackoverflow.com/questions/19737408/mongoose-check-if-objectid-exists-in-an-array
                    if (!association.company.some((doc) => doc.equals(company._id))) {
                        return res.status(400).json({error: "COMPANY_NOT_ASSOCIATED"});
                    }
                    association.company.splice(association.company.indexOf(company._id),1);
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                           return res.status(200).json({domain: company.domain});
                    });
                }
            });
        });

    });
};

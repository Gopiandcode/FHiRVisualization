module.exports = (env, router) => {
    const Company = require('../../db/models/company');
    const CompanyAssociations = require('../../db/models/companyAssociations');
    const IndividualUser = require('../../db/models/user').individual;
    const sanitizeError = require('../../sanitizeError');
    const ObjectId = require('mongoose').Types.ObjectId;

    function returnAssociatedCustomers(req, res) {
        CompanyAssociations.find({
            'company': ObjectId(req.user.company)
        }, (err, associations) => {
            if (err) {
                return res.status(400).json(sanitizeError(env, err));
            }

            IndividualUser.find({
                '_id': {
                    $in: associations.map((association) => {
                        return ObjectId(association.user)
                    })
                }
            }, (err, users) => {
                if (err) {
                    return res.status(400).json(sanitizeError(env, err));
                }

                return res.status(200).json(users.map((user) => {
                    return {
                        email: user.email
                    };
                }));
            });

        });
    }

    router.get('/associations', returnAssociatedCustomers);

    router.delete('/associations', (req, res) => {
        // TODO: remove associations
        // find user by email, remove companyid
        const {email} = req.body;

        if (!email)
        // TODO: add email validation
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});

        IndividualUser.findOne({email: email}, (err, user) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (!user)
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            CompanyAssociations.findOne({user: user._id}, (err, association) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                if (!association) {
                    association = new CompanyAssociations({
                        user: user._id,
                        company: []
                    });
                    association.save((err, saved) => {
                        if (err) {
                            return res.status(400).json(sanitizeError(env, err));
                        }
                        return returnAssociatedCustomers(req, res);
                    });
                } else {
                    if (!association.company.some(doc => doc.equals(req.user.company))) {
                        return res.status(400).json({error: 'COMPANY_NOT_ASSOCIATED'});
                    }
                    association.company.splice(association.company.indexOf(req.user.company));
                    association.save((err, saved) => {
                        if(err)
                            return res.status(400).json(sanitizeError(env, err));

                        return res.status(200).json({email: user.email});
                    });
                }
            });
        });

    });
};

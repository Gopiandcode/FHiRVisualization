function sanitizePreferences(preferences) {

    return preferences.map((obj) => {
        return {
            mainDataType: obj.mainDataType,
            secondaryDataType: obj.secondaryDataType,
            colour: obj.colour,
            visualization: obj.visualization
        };
    });
}

module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const CorporateVisualizationPreferences = require('../../db/models/visualizationPreferences').corporate;
    const SECONDARY_NEEDED = require('../../db/models/data').AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED;

    router.get('/preferences', (req, res) => {
        CorporateVisualizationPreferences.find({user: req.user._id}, (err, preferences) => {
            if (err) {
                return res.status(400).json(sanitizeError(env, err));
            }
            return res.status(200).json(sanitizePreferences(preferences));
        });
    });

    router.post('/preferences', (req, res) => {
        const {mainDataType, colour, visualization} = req.body;
        if (!mainDataType || !colour || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(visualization in SECONDARY_NEEDED)) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }
        if (SECONDARY_NEEDED[visualization]) {
            const secondaryDataType = req.body.secondaryDataType;
            if (!secondaryDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_NOT_PROVIDED'});
            }
            if (secondaryDataType === mainDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_EQUALS_PRIMARY'});
            }
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                secondaryDataType: secondaryDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                if (pref) {
                    return res.status(400).json({error: "RESOURCE_ALREADY_EXISTS"});
                }
                pref = new CorporateVisualizationPreferences({
                    'user': req.user._id,
                    'mainDataType': mainDataType,
                    'secondaryDataType': secondaryDataType,
                    'colour': colour,
                    'visualization': visualization
                });

                pref.save((err, savedPref) => {
                    if (err)
                        return res.status(400).json(sanitizeError(env, err));
                    return res.status(200).json({
                        mainDataType: savedPref.mainDataType,
                        secondaryDataType: savedPref.secondaryDataType,
                        colour: savedPref.colour,
                        visualization: savedPref.visualization
                    });
                })
            });
        } else {
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err) return res.status(400).json(sanitizeError(env, err));

                if (pref) {
                    return res.status(400).json({error: "RESOURCE_ALREADY_EXISTS"});
                }

                pref = new CorporateVisualizationPreferences({
                    'user': req.user._id,
                    'mainDataType': mainDataType,
                    'colour': colour,
                    'visualization': visualization
                });
                pref.save((err, savedPref) => {
                    if (err)
                        return res.status(400).json(sanitizeError(err));
                    return res.status(200).json({
                        mainDataType: savedPref.mainDataType,
                        colour: savedPref.colour,
                        visualization: savedPref.visualization
                    });
                })
            });
        }
    });

    router.put('/preferences', (req, res) => {
        const {mainDataType, colour, visualization} = req.body;
        if (!mainDataType || !colour || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(visualization in SECONDARY_NEEDED)) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }

        if (SECONDARY_NEEDED[visualization]) {
            const secondaryDataType = req.body.secondaryDataType;
            if (!secondaryDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_NOT_PROVIDED'});
            }
            if (secondaryDataType === mainDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_EQUALS_PRIMARY'});
            }
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                secondaryDataType: secondaryDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                if (!pref) {
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});
                }

                pref.colour = colour;
                pref.save((err, savedPref) => {
                    if (err)
                        return res.json(sanitizeError(err));
                    return res.status(200).json({
                        mainDataType: savedPref.mainDataType,
                        secondaryDataType: savedPref.secondaryDataType,
                        visualization: savedPref.visualization,
                        colour: savedPref.colour
                    });
                });
            });
        } else {
            CorporateVisualizationPreferences.findOne({
                user: req.user._id,
                mainDataType: mainDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                if (!pref) {
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});
                }

                pref.colour = colour;
                pref.save((err, savedPref) => {
                    if (err)
                        return res.json(sanitizeError(err));
                    return res.json({
                        mainDataType: savedPref.mainDataType,
                        visualization: savedPref.visualization,
                        colour: savedPref.colour
                    });
                });
            });
        }

    });


    router.delete('/preferences', (req, res) => {
        const {mainDataType, visualization} = req.body;
        if (!mainDataType || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(visualization in SECONDARY_NEEDED)) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }

        if (SECONDARY_NEEDED[visualization]) {
            const secondaryDataType = req.body.secondaryDataType;
            if (!secondaryDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_NOT_PROVIDED'});
            }
            if (secondaryDataType === mainDataType) {
                return res.status(400).json({error: 'SECONDARY_DATA_EQUALS_PRIMARY'});
            }
            CorporateVisualizationPreferences.findOneAndRemove({
                user: req.user._id,
                mainDataType: mainDataType,
                secondaryDataType: secondaryDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json({error: sanitizeError(env, err)});
                if (!pref)
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});
                return res.status(200).json({
                    mainDataType: pref.mainDataType,
                    secondaryDataType: secondaryDataType,
                    visualization: pref.visualization,
                    colour: pref.colour
                });
            });

        } else {
            CorporateVisualizationPreferences.findOneAndRemove({
                user: req.user._id,
                mainDataType: mainDataType,
                visualization: visualization
            }, (err, pref) => {
                if (err)
                    return res.status(400).json({error: sanitizeError(env, err)});
                if (!pref)
                    return res.status(404).json({error: 'RESOURCE_DOES_NOT_EXIST'});

                return res.status(200).json({
                    mainDataType: pref.mainDataType,
                    visualization: pref.visualization,
                    colour: pref.colour
                });
            });
        }
    });
};
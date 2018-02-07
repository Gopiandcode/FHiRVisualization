function sanitizePreferences(preferences) {
    return preferences.map((preference) => {
        return {
            dataType: preference.dataType,
            colour: preference.colour,
            visualization: preference.visualization
        }
    });
}


module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const IndividualVisualizationPreferences = require('../../db/models/visualizationPreferences').individual;
    const Data = require('../../db/models/data');

    router.get('/preferences', (req, res) => {
        IndividualVisualizationPreferences.find({user: req.user._id}, (err, preferences) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            return res.status(200).json(sanitizePreferences(preferences));
        });
    });

    router.post('/preferences', (req, res) => {
        const {dataType, colour, visualization} = req.body;
        if (!dataType || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(Data.VALID_DATA_TYPES.includes(dataType))) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!(Data.VALID_VISUALIZATIONS.includes(visualization))) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }
        if (!(Data.DATA_SPECIFICATION[dataType].validVisualizations.includes(visualization))) {
            return res.status(400).json({error: 'INCOMPATIBLE_VISUALIZATION'});
        }
        IndividualVisualizationPreferences.findOne({
            user: req.user._id,
            dataType: dataType
        }, (err, pref) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (pref) {
                if (colour && pref.colour !== colour)
                    return res.status(400).json({error: 'COLOUR_MISMATCH'});
                if (pref.visualization.includes(visualization))
                    return res.status(400).json({error: "VISUALIZATION_EXISTS"});
                pref.visualization.push(visualization);
            } else {
                if (!colour) {
                    return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
                }

                pref = new IndividualVisualizationPreferences({
                    user: req.user._id,
                    dataType: dataType,
                    colour: colour,
                    visualization: [visualization]
                });
            }

            pref.save((err, savedPref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                return res.status(200).json({
                    dataType: savedPref.dataType,
                    colour: savedPref.colour,
                    visualization: savedPref.visualization
                });
            });
        });
    });

    router.put('/preferences', (req, res) => {
        const {dataType, colour} = req.body;
        if (!dataType || !colour) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!(Data.VALID_DATA_TYPES.includes(dataType))) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }

        IndividualVisualizationPreferences.findOne({
            user: req.user._id,
            dataType: dataType
        }, (err, pref) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (!pref) {
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            }
            pref.colour = colour;

            pref.save((err, savedPref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                return res.status(200).json({
                    dataType: savedPref.dataType,
                    colour: savedPref.colour,
                    visualization: savedPref.visualization
                });
            });
        });
    });

    router.delete('/preferences', (req, res) => {
        const {dataType, visualization} = req.body;

        if (!dataType || !visualization) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }

        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }

        if (!(Data.VALID_VISUALIZATIONS.includes(visualization))) {
            return res.status(400).json({error: 'INVALID_VISUALIZATION'});
        }

        IndividualVisualizationPreferences.findOne({
            user: req.user._id,
            dataType: dataType
        }, (err, pref) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));

            if (!pref) {
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            }
            if (!pref.visualization.includes(visualization)) {
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            }

            // How to remove item from array by value
            // Reference: https://stackoverflow.com/questions/3954438/how-to-remove-item-from-array-by-value
            pref.visualization.splice(pref.visualization.indexOf(visualization), 1);

            pref.save((err, savedPref) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));
                return res.status(200).json({
                    dataType: savedPref.dataType,
                    colour: savedPref.colour,
                    visualization: savedPref.visualization
                });
            });
        });

    });
};

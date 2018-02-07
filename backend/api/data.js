module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const Data = require('../db/models/data');



    router.get('/types/all', (req,res) => {
        // Map Equivalent for Objects
        // Reference: https://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays
        let result = Object.keys(Data.DATA_SPECIFICATION).map((key) => {
            return {
                dataType: key,
                name: Data.DATA_SPECIFICATION[key].name,
                profile: Data.DATA_SPECIFICATION[key].profile
            };
        });
        res.status(200).json(result);
    });


    router.get('/types/:dataType/visualizations', (req,res) => {
        const dataType = req.params.dataType;
        if(!dataType) {
            res.status(400).json({error: 'NO_DATA_TYPE_PROVIDED'});
        }
        if(!(dataType in Data.DATA_SPECIFICATION)) {
            res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
        }
        let result = Data.DATA_SPECIFICATION[dataType].validVisualizations;
        res.status(200).json(result);
    });




    return router;
};

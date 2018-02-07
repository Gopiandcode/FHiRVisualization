module.exports = (env) => {
    const express = require('express');
    const router = express.Router();
    const Data = require('../db/models/data');

    router.get('/colours', (req, res) => {
        return res.status(200).json(Data.COLORS);
    });


    router.get('/aggregate/specification', (req, res) => {
        return res.status(200).json(Data.AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED);
    });

   router.get('/:visualization/type', (req, res)=> {
        const visualization = req.params.visualization;
        if(!visualization){
          return res.status(400).json({error: 'NO_VISUALIZATION_PROVIDED'});
        }
        if(!(visualization in Data.AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED)) {
           return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
        }

        return res.status(200).json({
            visualization: visualization,
            type: Data.AGGREGATE_VISUALIZATIONS_SECONDARY_NEEDED[visualization] ?
                'MULTI_DATA' : 'SINGLE_DATA'
        });
    });

    return router;
};

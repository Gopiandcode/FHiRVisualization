module.exports = (env, router) => {
    const sanitizeError = require('../../sanitizeError');
    const Data = require('../../db/models/data');
    const Goal = require('../../db/models/goal').Goal;
    const GOAL_PERIODS = require('../../db/models/goal').GOAL_PERIODS;

    let sanitizeGoal = (goal) => {
        return {
            dataType: goal.dataType,
            name: goal.name,
            colour: goal.colour,
            value: goal.value,
            period: goal.period
        };
    };

    let returnAllGoals = (req, res) => {
        // TODO: Return all goals for user

//            if (err)
//               return res.status(400).json(sanitizeError(env, err));
        Goal.find({user: req.user._id}, (err, goals) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            let result = goals.map(sanitizeGoal);

            res.status(200).json(result);
        });
    };

    router.get('/goals', returnAllGoals);

    router.post('/goals', (req, res) => {
        // TODO: Store new goal
        const {name, dataType, colour, value, period} = req.body;

        if (!name || !dataType || !value || !colour || !period) {

            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!GOAL_PERIODS.includes(period)) {
            return res.status(400).json({error: 'INVALID_PERIOD'});
        }
        if(!Data.COLORS.includes(colour)) {
            return res.status(400).json({error: 'INVALID_COLOUR'});
        }

        Goal.findOne({user: req.user._id, name: name}, (err, goal) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (goal)
                return res.status(400).json({error: 'GOAL_EXISTS'});

            goal = new Goal({
                user: req.user._id,
                dataType,
                name,
                colour,
                value,
                period
            });
            goal.save((err, saved) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                return res.status(200).json(sanitizeGoal(saved));
            });
        });
    });

    router.put('/goals', (req, res) => {
        // TODO: Update fields of goal
         const {name, dataType, colour, value, period} = req.body;

        if (!name || !dataType || !colour || !value || !period) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }
        if (!Data.VALID_DATA_TYPES.includes(dataType)) {
            return res.status(400).json({error: 'INVALID_DATATYPE'});
        }
        if (!GOAL_PERIODS.includes(period)) {
            return res.status(400).json({error: 'INVALID_PERIOD'});
        }
        if(!Data.COLORS.includes(colour)) {
            return res.status(400).json({error: 'INVALID_COLOUR'});
        }

        Goal.findOne({user: req.user._id, name: name}, (err, goal) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (!goal)
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});

            goal.dataType = dataType;
            goal.value = value;
            goal.period = period;
            goal.colour = colour;
           goal.save((err, saved) => {
                if (err)
                    return res.status(400).json(sanitizeError(env, err));

                return res.status(200).json(sanitizeGoal(saved));
            });
        });

    });

    router.delete('/goals', (req, res) => {
        // TODO: Remove Goal
          const { name } = req.body;

        if (!name) {
            return res.status(400).json({error: 'INCOMPLETE_PARAMETERS'});
        }

       Goal.findOneAndRemove({user: req.user._id, name: name}, (err, goal) => {
            if (err)
                return res.status(400).json(sanitizeError(env, err));
            if (!goal)
                return res.status(404).json({error: 'RESOURCE_NOT_FOUND'});
            return res.status(200).json(sanitizeGoal(goal));
        });


    });
};

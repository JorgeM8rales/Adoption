const {check, validationResult} = require('express-validator');

const generateUservalidators = () =>[
    check('alias').notEmpty().isLength({max:50}).withMesseage("invalid alias"),
    check('type').notEmpty().isLength({max:50}).withMessage("invalid types"),
    check('color').notEmpty().isLength({min:10, max:10}).isNumeric().whitMessage("Invalidcolor(10 numbers)"),
    check('notes').notEmpty().isLength({max:150}).withMessage("Invalid notes")
]

const generateidvalidators = () => [
    check('id').notEmpty().isNumeric().whitMessage("invalid id"),

]

const updateUserValidators = () =>[
    check('id').notEmpty().isNumeric().withMessage("invalid id"),
    check('alias').isLength({max:50}).withMessage("invalid alias"),
    check('type').isLength({max:50}).withMessage("invalid type"),
    check('color').isLength({max:50}).withMessage("invalid color"),
    check('notes').isLength({max:150}).withMessage("invalid notes"),

]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({
            "success" : false,
            "code" : 404,
            "message" : errors,
            "data" :[]
        });
    }
    next();
}

module.exports = {
    add:[
    generatePetValidators(),
    reporter

    ],
    id:[
        generatePetValidators(),
        reporter
    ],
    update:[
        updatePetValidators(),
        reporter
    ]
};

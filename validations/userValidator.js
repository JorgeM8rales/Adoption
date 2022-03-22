const {check, validationResult} = require('express-validator');

const generateUservalidators = () =>[
    check('name').notEmpty().isLength({max:50}).withMesseage("invalid name"),
    check('lastname').notEmpty().isLength({max:50}).withMessage("invalid lastname"),
    check('phone').notEmpty().isLength({min:10, max:10}).isNumeric().whitMessage("Invalidphone(10 numbers)"),
    check('address').notEmpty().isLength({max:150}).withMessage("Invalid address")
]

const generateidvalidators = () => [
    check('id').notEmpty().isNumeric().withMessage("invalid id")

]

const updateUserValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("invalid id"),
    check('name').isLength({max:50}).withMessage("invalid name"),
    check('lastname').isLength({max:50}).withMessage("invalid lastname"),
    check('phone').optional().isLength({min:10, max:10}).isNumeric().whitMessage("invalid phone(10 numbers')"),
    check('address').isLength({max:150}).whitMessage("invalid address"),
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
    generateUserValidators(),
    reporter

    ],
    id:[
        generateUserValidators(),
        reporter
    ],
    update:[
        updateUserValidators(),
        reporter
    ]
};

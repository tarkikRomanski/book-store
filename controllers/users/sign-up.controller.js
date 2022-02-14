const {
    User,
} = require('../../database/models')
const md5 = require('md5');
const {
    responseService,
} = require('../../services')

async function signUpController(req, res) {
    const {
        name,
        email,
        password,
    } = req.body

    try {
        await User.create({
            email,
            name,
            password: md5(password),
        })

        responseService.sendSuccessResponse(
            res,
            {
                email,
                name,
            },
            201,
        )
    } catch (e) {
        responseService.sendErrorResponse(
            res,
            e,
        )
    }

}

module.exports = signUpController

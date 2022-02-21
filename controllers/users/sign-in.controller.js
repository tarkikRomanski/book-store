const {
    User,
} = require('../../database/models')
const {
    responseService,
} = require('../../services')
const md5 = require('md5')

async function signInController(req, res) {
    const {
        email,
        password,
    } = req.query

    const result = await User.findOne({
        where: {
            email,
            password: md5(password),
        }
    })

    if (result === null) {
        responseService.sendErrorResponse(
            res,
            'Invalid password or email',
        )

        return
    }

    responseService.sendSuccessResponse(
        res,
        result,
    )
}

module.exports = signInController

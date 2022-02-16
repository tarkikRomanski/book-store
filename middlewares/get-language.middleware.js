function getLanguageMiddleware(req, res, next) {
    const language = req.header('Local')

    req.language = language

    next()
}

module.exports = getLanguageMiddleware

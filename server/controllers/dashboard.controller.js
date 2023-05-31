const { Router } = require('express')
dashboardController = Router()


dashboardController.get('/', (req, res) => {
    res.status(200).send({response:"You have successfully unlocked the content"})
})


module.exports = { dashboardController }
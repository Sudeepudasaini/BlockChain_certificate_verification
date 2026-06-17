const express = require('express')
const router = express.Router()
const careerController = require('../controllers/careerController')

router.get('/recommendations', careerController.getRecommendations)
router.post('/ask', careerController.askAssistant)

module.exports = router

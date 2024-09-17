const express = require('express');
const router = express.Router();
const speedTestController = require('../controllers/speedTestController');
const configController = require('../controllers/configController');

router.post('/speed-tests', speedTestController.createSpeedTestResult);
router.get('/speed-tests', speedTestController.getSpeedTestResults);
router.delete('/speed-tests/:id', speedTestController.deleteSpeedTestResult);

router.get('/config', configController.getConfig);
router.put('/config', configController.updateConfig);

module.exports = router;

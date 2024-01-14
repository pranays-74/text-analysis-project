const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');
const multer = require('multer');
const { validateFileType } = require('../middlewares/checkFileType');

const upload = multer();

router.get('/', textController.getAll);
router.get('/getreport/:id', textController.getReport);

router.post('/upload', upload.single('file'), validateFileType, textController.uploadFile);

router.post('/analysis/:id', textController.analysis);
router.delete('/delete/:id', textController.delete);

module.exports = router;
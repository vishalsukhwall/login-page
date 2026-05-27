const express = require('express');
const authMiddlewares=require('../middlewares/authe')

const router = express.Router();
const multer = require('multer');
const fileModel = require('../models/file_model');

// multer setup
const upload = multer({ dest: 'uploads/' });

// home page
router.get('/home',authMiddlewares, (req, res) => {
    res.render('home');
});

// upload route
router.post('/upload',authMiddlewares, upload.single('file'), async (req, res) => {

        const newFile = await fileModel.create({
            path: req.file.path,
            originalname: req.file.originalname
            
        })
});

module.exports = router;
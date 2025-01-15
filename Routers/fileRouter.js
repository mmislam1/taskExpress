import path from 'path';
import multer from 'multer';
import express from 'express';

const fileRouter = express.Router();


const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
        }
    },
});




fileRouter.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            message: 'File uploaded successfully!',
            file: req.file,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


export default fileRouter;
import path from 'path';
import multer from 'multer';
import express from 'express';
import { isAdmin, isAuth } from '../helper';
import fs from 'fs';


const fileRouter = express.Router();


let urlOfImage=''


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        
        const userId = req.body.userId 

        const userFolder = `./uploads/${userId}`;

        urlOfImage+=userFolder

        
        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        cb(null, userFolder); 
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        urlOfImage += `/${uniqueName}`;
        cb(null, uniqueName); 
    },
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed (jpeg, jpg, png, gif)'));
        }
    },
});




fileRouter.post('/upload',isAuth,isAdmin, upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            message: urlOfImage,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


export default fileRouter;
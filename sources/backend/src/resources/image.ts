import { Request, Response } from 'express';
import multer from 'multer';

const imageUpload = multer({
    dest: 'images',
   });
   

export const upload = async (req: Request, res: Response) => {
    console.log(req.file);

    return res.send({
        status: 'success'
    })
}
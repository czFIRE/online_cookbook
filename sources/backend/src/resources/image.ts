import prisma from '../client';
import { Request, Response } from 'express';
import { object, string } from 'yup';
import * as fs from 'fs';

const imageSchema = object({
    base64: string().required(),
    recipeId: string().required().uuid(),
});

export const upload = async (req: Request, res: Response) => {
    // console.log("REQ", req.body);
    // console.log(req.complete);
    // console.log(req.res)
    // fs.readFile(req._read(), "binary", function(err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(data);
    //     }
    // });
    // req.addListener("data", x => {
    //     console.log(x.toJSON());
    //     console.log(x.toString());
    //     try {
    //         fs.writeFile('test.webp', req.file.buffer, null,  err =>{
    //             console.log(err);
    //         });
    //     } catch (e) {
    //         return res.status(200).send({})
    //     }
    //     return;
    // })
    // console.log(req.body)
    try {
        fs.writeFile('test.webp', req!.file!.buffer, null,  err =>{
            console.log(err);
        });
    } catch (e) {
        return res.status(200).send({})
    }
    const image = {
        base64: Object.keys(req.body)[0],
        recipeId: req.params.id!,
    }
    try {
        const data = await imageSchema.validate(image);
        await prisma.image.create({
            data
        })
    } catch(e) {
        //console.log(e)
    }


    return res.send({
        status: 'success'
    })
}

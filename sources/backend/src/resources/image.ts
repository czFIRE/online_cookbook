import prisma from '../client';
import { Request, Response } from 'express';
import { object, string, ValidationError } from 'yup';
import * as fs from 'fs';
import { statusCodes } from './CONSTANTS';

const imageSchema = object({
    base64: string().required(),
    recipeId: string().required().uuid(),
});

export const upload = async (req: Request, res: Response) => {
    const imageFolder = `images/${req.params.id!}`;
    const fileName = `${imageFolder}/${req.file!.originalname}`;
    try {
        if (!fs.existsSync("images")) {
            fs.mkdirSync("images")
        }

        if (!fs.existsSync(imageFolder)) {
            fs.mkdirSync(imageFolder)
        }
        fs.writeFile(fileName, req!.file!.buffer, null,  err => {
            console.log(err);
            
        });
    } catch (e) {
        return res.status(statusCodes.InternalError).send({
            message: "File could not be saved"
        })
    }

    const image = {
        base64: fileName,
        recipeId: req.params.id!,
    }

    try {
        const data = await imageSchema.validate(image);
        await prisma.image.create({
            data,
        })

        return res.status(statusCodes.Created).send({
            status: "success",
            message: "Image was stored",
        })
    } catch(e) {
        if (e instanceof ValidationError) {
            return res.status(statusCodes.BadRequest).send({
                status: "error",
                data: e.errors,
                message: e.message
            });
        }
    }


    return res.status(statusCodes.InternalError).send({
        status: 'error',
        message: 'Something went wrong',
    })
}

export const show = async (req: Request, res: Response) => {
    try {
        const path = req.path.replace("/", "");        
        fs.readFileSync(`${path}`) // Make sure the file exists
        return res.status(statusCodes.Success).sendFile(`${path}`, {
            root: process.env.REACT_APP_BACKEND_ABSOLUTE_PATH
        })
    } catch (e) {
        return res.status(statusCodes.NotFound).send({
            status: 'error',
            message: 'Image is not present',
        })
    }
}
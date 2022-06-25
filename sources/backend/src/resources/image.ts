import prisma from '../client';
import { Request, Response } from 'express';
import { object, string } from 'yup';

const imageSchema = object({
    base64: string().required(),
    recipeId: string().required().uuid(),
});

export const upload = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(Object.keys(req.body.data)[0]);
    console.log(req.params.id);
    const image = {
        base64: Object.keys(req.body.data)[0],
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
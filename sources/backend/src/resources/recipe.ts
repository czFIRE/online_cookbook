import { Request, Response } from 'express';
import { object, string, ValidationError, number, array } from 'yup';
import prisma from '../client';

const recipeSchema = object({
    name: string().required(),
    timeComplexity: number().required(),
    portions: number().required(),
    ingredients: string().required(),
    steps: string().required(),
    categoryId: string().required().uuid(),
    userId: string().required().uuid(),
});

export const list = async (req: Request, res: Response) => {
    const recipes = await prisma.recipe.findMany({
    });

    return res.send({
        status: "success",
        data: recipes
    })
}

export const show = async (req: Request, res: Response) => {
    const recipe = await prisma.recipe.findUnique({
        where: {
            id: req.params.id,
        }
    });

    if (!recipe) {
        return res.status(404).send({
            status: 'missing'
        })
    }

    return res.send({
        status: 'success',
        data: recipe
    })
}

export const update = async (req: Request, res: Response) => {
    return res.send({
        status: 'success',
    })
}

export const setRating = async (req: Request, res: Response) => {
    return res.send({
        status: 'success'
    })
}

export const create = async (req: Request, res: Response) => {
    try {
        const data = await recipeSchema.validate(req.body);
        const recipe = await prisma.recipe.create({
            data
        });

        return res.send({
            status: 'success',
            data: recipe.id,
            message: 'Stored to system'
        })
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(400).send({
                status: "error",
                data: e.errors,
                message: e.message
            });
        }
    }

    return res.status(500).send({
        status: "error",
        message: "Something went wrong",
    })
}

export const destroy = async (req: Request, res: Response) => {
    const request = await prisma.recipe.delete({
        where: {
          id: req.params.id
        }
    });
    
    return res.send({
        status: "sucess",
        data: request,
        message: "Recipe removed"
    })
}

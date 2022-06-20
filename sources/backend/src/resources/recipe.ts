import { Request, Response } from 'express';
import { object, string, ValidationError, number } from 'yup';
import prisma from '../client';
import { statusCodes } from './CONSTANTS';

const recipeSchema = object({
    name: string().required(),
    timeComplexity: number().required(),
    portions: number().required(),
    description: string().required(),
    ingredients: string().required(),
    steps: string().required(),
    categoryId: string().required().uuid(),
    userId: string().required().uuid(),
});

export const list = async (req: Request, res: Response) => {
    const recipes = await prisma.recipe.findMany({
    });

    return res.status(statusCodes.Success).send({
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
        return res.status(statusCodes.NotFound).send({
            status: 'missing'
        })
    }

    return res.status(statusCodes.Success).send({
        status: 'success',
        data: recipe
    })
}

export const create = async (req: Request, res: Response) => {
    try {
        const data = await recipeSchema.validate(req.body);
        const recipe = await prisma.recipe.create({
            data
        });

        return res.status(statusCodes.Created).send({
            status: 'success',
            data: recipe.id,
            message: 'Stored to system'
        })
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(statusCodes.BadRequest).send({
                status: "error",
                data: e.errors,
                message: e.message
            });
        }
    }

    return res.status(statusCodes.InternalError).send({
        status: "error",
        message: "Something went wrong",
    })
}

export const destroy = async (req: Request, res: Response) => {
    await prisma.recipe.delete({
        where: {
          id: req.params.id
        }
    });
    
    return res.status(statusCodes.Success).send({
        status: "sucess",
        message: "Recipe removed"
    })
}

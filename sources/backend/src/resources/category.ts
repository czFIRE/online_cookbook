import { Request, Response } from 'express';
import prisma from '../client';
import { statusCodes } from './CONSTANTS';

export const listCategory = async (req: Request, res: Response) => {
    const category = await prisma.category.findMany({
        where: {
            name: req.params.name,
        },
        select: {
            Recipe: true,
            name: true,
        }
    })

    if (!category.length) {
        return res.status(statusCodes.NotFound).send({
            status: "Not found",
            message: "Category was not found"
        })
    }

    return res.status(statusCodes.Success).send({
        status: "success",
        data: category
    })
}

export const categories = async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany({
        select: {
            name: true,
            id: true,
        }
    })

    if (!categories.length) {
        return res.status(statusCodes.NotFound).send({
            status: "Not found",
            message: "There are no categories"
        })
    }

    return res.status(statusCodes.Success).send({
        status: "success",
        data: categories,
    })
}

export const getCategoryName = async (req: Request, res: Response) => {
    const category = await prisma.category.findUnique({
        select: {
            name: true,
        },
        where: {
            id: req.params.id
        }
    })

    if (!category?.name) {
        return res.status(statusCodes.NotFound).send({
            status: "Not found",
            message: "There isn't any category with this id"
        })
    }
    
    return res.status(statusCodes.Success).send({
        status: "success",
        data: category.name,
    })
}

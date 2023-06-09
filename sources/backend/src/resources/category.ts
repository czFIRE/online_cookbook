import { Request, Response } from 'express';
import prisma from '../client';

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
        return res.status(404).send({
            status: "Not found",
            message: "Category was not found"
        })
    }

    return res.send({
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
        return res.status(404).send({
            status: "Not found",
            message: "There are no categories yet"
        })
    }

    return res.send({
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
        return res.status(404).send({
            status: "Not found",
            message: "There are no categories yet"
        })
    }
    
    return res.send({
        status: "success",
        data: category.name,
    })
}

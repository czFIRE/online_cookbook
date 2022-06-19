import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
    return res.send({
        status: 'success'
    })
}

export const show = async (req: Request, res: Response) => {
    return res.send({
        status: 'success'
    })
}

import { Request, Response } from 'express';

export const show = async (req: Request, res: Response) => {
    return res.send({
        status: 'success'
    })
}

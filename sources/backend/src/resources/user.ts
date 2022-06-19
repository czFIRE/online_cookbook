import { Request, Response } from 'express';

export const profile = async (req: Request, res: Response) => {
    return res.send({
        status: 'success'
    })
}

import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";

export const validateObjectId = (req: Request, res: Response, next: NextFunction) => {
    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({success: false, message: "Invalid ID Format"})
    }

    next();
}
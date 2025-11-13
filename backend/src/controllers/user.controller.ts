import { User } from "../models/user.model";
import { Request, Response } from "express";
import { z } from 'zod';

const userSchema = z.object({
    auth0Id: z.string(),
    email: z.string(),
    role: z.enum(['admin', 'user']).optional().default("user")
});

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userInformation = userSchema.safeParse(req.body);
        if(!userInformation.success) {
            res.status(400).json({ message: "Invalid input", errors: userInformation.error.message });
            return;
        }

        const existingUser = await User.findOne({ email: userInformation.data.email })
        if(existingUser) {
            res.status(409).json({ message: "User with this email already exists" })
            return;
        }

        const newUser = await User.create(userInformation.data);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error})
    }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().lean();
        if(users.length === 0) {
            res.status(200).json({ success: true, message: "No users found", data: []});
            return;
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error})
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;

        const userFounded = await User.findById(userId).lean();
        if(!userFounded) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(userFounded);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error})
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userData = userSchema.partial().safeParse(req.body);
        if(!userData.success) {
            res.status(400).json({ message: "Invalid input", errors: userData.error.message });
            return;
        }

        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(userId, userData.data, { new: true, runValidators: true });
        if(!user) {
            res.status(404).json({ message: "User not found"});
            return;
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error});  
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;

        const user = await User.findByIdAndDelete(userId);
        if(!user) {
            res.status(404).json({ message: "User not found"});
            return;
        }

        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
}

import { Task } from "../models/task.model";
import { Request, Response } from "express";
import { z } from "zod";


const taskSchema = z.object({
    title: z.string().min(4),
    description: z.string().max(255),
    status: z.enum(['pending', 'inProgress', 'completed']).optional(),
    userId: z.string()
});

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const userAuth = (req.auth?.payload as any)?.sub as string;

        const taskData = taskSchema.omit({ userId: true }).safeParse(req.body);
        if(!taskData.success) {
            res.status(400).json({ 
                success: false, 
                message: 'Invalid input', 
                errors: taskData.error
            });

            return;
        }

        const newTask = await Task.create({...taskData.data, userId: userAuth });
        res.status(201).json({ 
            success: true, 
            message: "Task created successfully", 
            data: newTask
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error})
    }
}

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const userAuth = (req.auth?.payload as any)?.sub as string;

        const tasks = await Task.find({ userId: userAuth }).lean();
        if(tasks.length === 0) {
            res.status(200).json({ 
                success: true, 
                message: "No tasks have been found. Please create one.", 
                data: [] 
            });

            return;
        }

        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error})
    }
}

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const taskId = req.params.id;
        
        const taskFounded = await Task.findById(taskId).lean();
        if(!taskFounded) {
            res.status(404).json({ success: false, message: "The task does not exist."});
            return;
        }

        res.status(200).json({ success: true, message: "Task found", data: taskFounded })
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error})
    }
}

export const updatedTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const userAuth = (req.auth?.payload as any)?.sub as string;

        const taskData = taskSchema.omit({ userId: true }).partial().safeParse(req.body);
        if(!taskData.success) {
            res.status(400).json({ 
                success: false, 
                message: 'Invalid input', 
                errors: taskData.error
            });

            return;
        }

        const taskId = req.params.id;
        const task = await Task.findByIdAndUpdate(
            { _id: taskId, userId: userAuth }, 
            taskData.data, 
            { new: true, runValidators: true }
        )

        if(!task) {
            res.status(404).json({ success: false, message: "Task not found" });
            return;
        }

        res.status(200).json({ success: true, message: "Task successfully updated", data: task});
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error})
    }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const userAuth = (req.auth?.payload as any)?.sub as string;

       const taskId = req.params.id;
       const task = await Task.findOneAndDelete({ _id: taskId, userId: userAuth });
       if(!task) {
            res.status(404).json({ success: false, message: "Task not found" });
       }

       res.status(200).json({ success: true, message: "Task successfully deleted", data: task});
    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error})
    }
}
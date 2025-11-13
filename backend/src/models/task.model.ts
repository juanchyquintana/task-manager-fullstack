import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
    PENDING: "pending",
    IN_PROGRESS: "inProgress",
    COMPLETED: "completed"
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface TaskInterface extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    userId: string
}

const TaskSchema: Schema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    userId: {
        type: String,
        required: true,
        index: true
    }
}, { timestamps: true });

export const Task = mongoose.model<TaskInterface>("Task", TaskSchema) 
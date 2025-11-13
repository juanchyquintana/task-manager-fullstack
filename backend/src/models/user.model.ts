import mongoose, { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
    auth0Id: string;
    email: string;
    role: 'admin' | 'user';
}

const UserSchema: Schema = new Schema({
    auth0Id:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
        required: true
    },
}, { timestamps: true });

export const User = mongoose.model<UserInterface>("User", UserSchema);
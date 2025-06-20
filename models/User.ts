import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

const UserSchema: Schema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String },
    lastName: { type: String },
  },
  { timestamps: true }
);

// Prevent re-registering the model during hot reloads
export default models.User || model<IUser>('User', UserSchema);

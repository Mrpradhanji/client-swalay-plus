import mongoose, { Schema, Document } from "mongoose";

// Define the interface for the Notify document
interface INotify extends Document {
  labels?: string[] | null;
  category?: string | null;
  message: string | null;
  time: Date | null;
}

// Define the schema for the Notify collection
const NotifySchema: Schema = new Schema({
  labels: {
    type: [String], // Array of strings
    default: null,  // Default to null if not provided
  },
  category: {
    type: String,
    default: null,  // Default to null if not provided
  },
  message: {
    type: String,
    required: true,  // This field is required
  },
  time: {
    type: Date,
    default: Date.now,  // Default to current date/time if not provided
  },
});

// Create the model for the Notify collection
const Notification =
  mongoose.models.Notification || mongoose.model<INotify>("Notification", NotifySchema);

export default Notification;

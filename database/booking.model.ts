import mongoose, { Document, Model, Schema } from "mongoose";

/**
 * TypeScript interface for Booking document
 */
export interface IBooking extends Document {
  eventId: mongoose.Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Booking Schema Definition
 */
const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

/**
 * Pre-save hook: Validate that the referenced event exists
 */
BookingSchema.pre("save", async function (next) {
  // Only validate eventId if it's new or modified
  if (this.isNew || this.isModified("eventId")) {
    try {
      // Import Event model to check existence
      const Event = mongoose.models.Event || (await import("./event.model")).default;
      
      const eventExists = await Event.exists({ _id: this.eventId });
      
      if (!eventExists) {
        return next(new Error("Referenced event does not exist"));
      }
    } catch (error) {
      return next(
        error instanceof Error ? error : new Error("Failed to validate event reference")
      );
    }
  }

  next();
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Compound index for unique bookings per email per event (optional but recommended)
BookingSchema.index({ eventId: 1, email: 1 }, { unique: true });

/**
 * Export Booking model
 * Uses existing model if already compiled (prevents OverwriteModelError in development)
 */
const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;

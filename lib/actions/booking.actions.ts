"use server";

import { Booking } from "@/database";
import connectDB from "@/lib/mongodb";

export const CreateBooking = async (
  eventId: string,
  slug: string,
  email: string
) => {
  try {
    await connectDB();

    await Booking.create({
      eventId,
      slug,
      email,
    });

    return {
      success: true,
    };
  } catch (e) {
    console.error("Error creating booking:", e);
    const error = e instanceof Error ? e : new Error("Unknown Error");
    return {
      success: false,
      error: error.message,
    };
  }
};

"use server";

import { Event } from "@/database";
import connectDB from "@/lib/mongodb";

export const GetSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    return await Event.find({
      _id: { $ne: event?._id }, 
      tags: { $in: event?.tags[0] },
    }).lean();
  } catch {
    return [];
  }
};

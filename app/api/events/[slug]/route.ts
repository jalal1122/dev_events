import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Event } from "@/database";

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Await params to get the slug value
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or missing slug parameter",
        },
        { status: 400 }
      );
    }

    // Validate slug format (URL-friendly characters only)
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    if (!slugRegex.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Slug must contain only lowercase letters, numbers, and hyphens",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Query event by slug
    const event = await Event.findOne({ slug }).lean();

    // Handle event not found
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with slug '${slug}' not found`,
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        success: true,
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging (in production, use proper logging service)
    console.error("Error fetching event by slug:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while fetching the event",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

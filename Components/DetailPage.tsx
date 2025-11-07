import BookEvent from "@/Components/BookEvent";
import EventCard from "@/Components/EventCard";
import { IEvent } from "@/database";
import { GetSimilarEventsBySlug } from "@/lib/actions/event.actions";
import { cacheLife, cacheTag } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

const EventDetailItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => {
  return (
    <div className="flex-row-gap-2 items-center">
      <Image src={icon} width={17} height={17} alt={alt} />
      <p>{label}</p>
    </div>
  );
};

const EventAgenda = ({ agenda }: { agenda: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul className="list-none">
      {agenda.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-1.5 flex-wrap">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const DetailPage = async ({ params }: { params: Promise<string> }) => {
  "use cache";
  cacheLife("seconds");
  cacheTag("event-details-page");

  const slug = await params;
  let event = null;

  try {
    const res = await fetch(`/api/events/${slug}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return notFound();
    }

    const data = await res.json();
    event = data.event;
    console.log("event ", event);
  } catch {
    return notFound();
  }

  if (!event) {
    return notFound();
  }

  const {
    description,
    image,
    overview,
    date,
    time,
    location,
    mode,
    agenda,
    audience,
    organizer,
    tags,
  } = event;

  const bookings = 10;

  const similarEvents: IEvent[] = await GetSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p className="mt-2">{description}</p>
      </div>

      <div className="details">
        {/* Left Side - Event Content */}
        <div className="content">
          <Image
            src={image}
            alt="Event Banner"
            width={600}
            height={400}
            className="banner"
          />

          <EventDetailItem
            icon="/icons/calendar.svg"
            alt="calendar"
            label={date}
          />
          <p>{overview}</p>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />

            <EventDetailItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />

            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />

            <EventDetailItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agenda={agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* Right Side - Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {bookings > 0 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}

            <BookEvent eventId={event._id} slug={event.slug} />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents && similarEvents.length > 0 ? (
            similarEvents.map((similarEvent: IEvent) => (
              <EventCard key={similarEvent.slug} {...similarEvent} />
            ))
          ) : (
            <p>No similar events found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailPage;

import EventCard from "@/Components/EventCard";
import ExploreBtn from "@/Components/ExploreBtn";
import { events, type Event } from '@/lib/constants';

export default function Home() {
  return (
    <section className="">
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&rsquo;t Miss
      </h1>
      <p className="text-center mt-5">
        Hackathon, Meetups and Conferences, All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul id="events" className="events list-none">
          {events.map((event: Event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

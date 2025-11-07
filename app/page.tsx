import EventCard from "@/Components/EventCard";
import ExploreBtn from "@/Components/ExploreBtn";
import { IEvent } from "@/database";
import { cacheLife, cacheTag } from "next/cache";
import { events, type Event } from "@/lib/constants";

// const events = [
//   {
//     title: "DevCon 2024",
//     image: "/images/event1.png",
//     slug: "devcon-2024",
//     location: "San Francisco, CA",
//     date: "2024-09-15",
//     time: "10:00 AM",
//   },
//   {
//     title: "Hack the Future",
//     image: "/images/event2.png",
//     slug: "hack-the-future",
//     location: "New York, NY",
//     date: "2024-10-10",
//     time: "11:00 AM",
//   },
//   {
//     title: "JS World Summit",
//     image: "/images/event3.png",
//     slug: "js-world-summit",
//     location: "Los Angeles, CA",
//     date: "2024-11-05",
//     time: "09:00 AM",
//   },
//   {
//     title: "AI Expo 2024",
//     image: "/images/event4.png",
//     slug: "ai-expo-2024",
//     location: "Virtual",
//     date: "2024-12-01",
//     time: "10:00 AM",
//   },
//   {
//     title: "Cloud Native Conf",
//     image: "/images/event5.png",
//     slug: "cloud-native-conf",
//     location: "Austin, TX",
//     date: "2024-12-15",
//     time: "09:00 AM",
//   },
// ];

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function Home() {

  "use cache";
  cacheLife("hours");
  cacheTag("home-page");

  // let events: IEvent[] = [];
  // try {
  //   const res = await fetch(`${BaseURL}/api/events`);
  //   if (!res.ok) throw new Error("Failed to fetch events");
  //   const data = await res.json();
  //   events = data.events;
  // } catch (error) {
  //   console.error("Error fetching events:", error);
  //   events = [];
  // }

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
          {events &&
            events.length > 0 &&
            events.map((event: Event) => (
              <li key={event.title}>
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

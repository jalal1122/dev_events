export type Event = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "Amsterdam, Netherlands",
    date: "2025-11-14",
    time: "09:00 AM - 6:00 PM",
  },
  {
    title: "AI & Machine Learning DevCon",
    image: "/images/event2.png",
    slug: "ai-ml-devcon-2025",
    location: "San Francisco, CA",
    date: "2025-11-20",
    time: "10:00 AM - 8:00 PM",
  },
  {
    title: "NextJS Conf 2025",
    image: "/images/event3.png",
    slug: "nextjs-conf-2025",
    location: "Virtual Event",
    date: "2025-11-28",
    time: "12:00 PM - 5:00 PM",
  },
  {
    title: "Blockchain Builders Hackathon",
    image: "/images/event4.png",
    slug: "blockchain-builders-hackathon",
    location: "Austin, TX",
    date: "2025-12-05",
    time: "08:00 AM - 11:59 PM",
  },
  {
    title: "Full Stack Web3 Summit",
    image: "/images/event5.png",
    slug: "full-stack-web3-summit",
    location: "London, UK",
    date: "2025-12-12",
    time: "09:30 AM - 7:00 PM",
  },
  {
    title: "Cloud Native DevOps Meetup",
    image: "/images/event6.png",
    slug: "cloud-native-devops-meetup",
    location: "Seattle, WA",
    date: "2025-12-18",
    time: "06:00 PM - 9:00 PM",
  },
];

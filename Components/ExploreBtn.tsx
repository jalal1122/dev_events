"use client";

import Image from "next/image";

const ExploreBtn = () => {
  const handleClick = () => {
    const eventsSection = document.getElementById("events");
    eventsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button 
      type="button" 
      id="explore-btn" 
      className="mt-7 mx-auto"
      onClick={handleClick}
    >
      Explore Events
      <Image
        src="/icons/arrow-down.svg"
        width={24}
        height={24}
        alt="arrow-down"
      />
    </button>
  );
};

export default ExploreBtn;

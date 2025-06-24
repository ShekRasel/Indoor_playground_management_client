import React from "react";
import { PrimaryButton } from "src/components/buttons/primary.button";
import { Assets } from "src/utils/assets";

const teamMembers = [
  {
    name: "Jannatul Ferdous",
    role: "Operations Manager",
    image: "https://i.pravatar.cc/300?img=12",
    bio: "Oversees day-to-day operations to ensure the playground runs smoothly and safely.",
  },
  {
    name: "Rahim Uddin",
    role: "Play Area Supervisor",
    image: "https://i.pravatar.cc/300?img=14",
    bio: "Monitors the playground zones and assists children for a fun and secure experience.",
  },
  {
    name: "Shamima Akter",
    role: "Safety & Cleanliness Officer",
    image: "https://i.pravatar.cc/300?img=36",
    bio: "Ensures all equipment is clean, well-maintained, and adheres to safety standards.",
  },
  {
    name: "Mehedi Hasan",
    role: "Event & Booking Coordinator",
    image: "https://i.pravatar.cc/300?img=22",
    bio: "Manages event scheduling and customer bookings with a smile and professionalism.",
  },
];

export const About = () => {
  return (
    <div className="px-4 py-10  mx-auto space-y-4 text-gray">
      {/* Header */}
      <h1 className="text-center text-2xl lg:text-4xl font-bold text-pink">
        Meet Our Team
      </h1>

      {/* Paragraph */}
      <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed">
        Our dedicated team ensures every child has a safe, exciting, and
        memorable experience in our indoor playground. From operations to
        events, we work together to make playtime perfect!
      </p>

      {/* Team Cards */}
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-8 mt-8">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2 text-center">
              <h2 className="text-xl font-semibold text-pink">{member.name}</h2>
              <p className="text-sm font-medium text-gray-600">{member.role}</p>
              <p className="text-sm text-gray-700">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {/* explore seciton */}
      <div className="space-y-4 mt-12 lg:mt-20">
        <h1 className="text-center text-2xl  font-bold text-gray">
          Explore Our Play Area
        </h1>
        <p className="text-center max-w-3xl mx-auto text-lg leading-relaxed">
          Step into a world of fun! Our indoor play areas are thoughtfully
          designed to spark imagination, encourage physical activity, and ensure
          maximum safety. Whether your child loves climbing, sliding, or
          creative role-play — we have dedicated zones to suit all interests and
          ages. Supervised by trained staff, our spaces offer both freedom and
          protection.
        </p>
        <div
          className="rounded-2xl h-66 lg:h-[500px] flex place-items-end p-4 lg:p-10"
          style={{
            backgroundImage: `url(${Assets.about_section})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 p-6 lg:p-16 max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-xl lg:text-3xl font-semibold">
              Discover Safe & Creative Spaces for All Ages
            </h2>
            <p className="text-lg">
              From toddler zones to teen adventures — we’ve built play areas
              that everyone loves.
            </p>
            <PrimaryButton className="">
              Explore Now
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

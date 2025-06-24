import { PlaygroundIntroSection } from "src/components/play.ground.section";
import { Assets } from "src/utils/assets";
import { About } from "./about";
import { Contact } from "./contact";

export const Home = () => {
  return (
    <div className="space-y-8 lg:space-y-16 mt-8">
      <div
        style={{
          backgroundImage: `url(${Assets.main_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="rounded-2xl h-66 lg:h-96 flex place-items-end p-4 lg:p-10"
      >
        <div className="bg-opacity-50  rounded-md text-white text-xl lg:text-4xl font-semibold text-center tracking-wider">
          Streamline Indoor Game Scheduling and Customer Management with Ease —
          Simplify Bookings, Track Attendance, and Enhance Player Experiences
          All in One Place
        </div>
      </div>

      <PlaygroundIntroSection />

      <About />

      <Contact />
    </div>
  );
};

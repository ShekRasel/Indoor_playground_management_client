import { Assets } from "src/utils/assets";
import { About } from "./about";
import { Contact } from "./contact";
import { Playareas } from "./playareas";

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
        <div className="bg-opacity-50 space-y-4 rounded-md text-white font-semibold text-center tracking-wider w-full">
          <p className="text-2xl lg:text-5xl  text-yellow-500 text-center">
            Streamline Indoor Game Scheduling and Customer
          </p>
          <p className="text-xl lg:text-4xl text-yellow-500 text-center">
            Management with Ease Simplify Bookings,{" "}
          </p>
          <p className="text-lg lg:text-3xl text-yellow-500 text-center">
            Track Attendance, and Enhance Player Experiences All in One Place
          </p>
        </div>
      </div>

      <Playareas />

      <About />

      <Contact />
    </div>
  );
};

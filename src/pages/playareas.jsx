import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL, BACKEND_IMG_URL } from "src/utils/helper";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { SecondaryButton } from "src/components/buttons/secondary.button";

export const Playareas = () => {
  const [playAreas, setPlayAreas] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_API_URL}/playareas`)
      .then((response) => {
        setPlayAreas(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="space-y-4 lg:space-y-4 mt-10">
      <h1 className="text-center text-xl lg:text-2xl font-semibold text-pink">
        Explore Our Spacious and Safe Indoor Playground Areas
      </h1>
      <h1 className="text-gray text-center font-semibold max-w-xl place-items-center mx-auto">
        Designed to provide fun, adventure, and learning opportunities for
        children of all ages. Discover a variety of zones tailored for toddlers,
        kids, and teens.
      </h1>

      <div className="grid lg:grid-cols-2 gap-8 text-gray mt-8">
        {playAreas.map((playArea) => (
          <div key={playArea.PLAYAREAID} className="bg-black rounded-lg">
            <div
              className="h-56 rounded-t-lg w-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${BACKEND_IMG_URL}${playArea.IMAGEURL})`,
              }}
            />
            <div className="p-4 lg:p-8 space-y-4">
              <h1 className="font-semibold text-pink text-xl">
                {playArea.NAME}
              </h1>
              <p>
                <span className="font-semibold text-white">Capacity:</span>{" "}
                {playArea.CAPACITY} children
              </p>
              <p>
                <span className="font-semibold text-white">Rate/Hour:</span> ৳
                {playArea.RATEPERHOUR}
              </p>
              {playArea.DISCOUNTRATE > 0 && (
                <p className="text-green-400 font-medium">
                  🎉 {playArea.DISCOUNTRATE}% Discount Available!
                </p>
              )}
              <div className="flex justify-end">
                <Link to={`/book_details/${playArea.NAME}`}>
                  <SecondaryButton className="text-sm flex gap-2 items-center">
                    <span>Book Now</span> <FaArrowRight size={16} />
                  </SecondaryButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

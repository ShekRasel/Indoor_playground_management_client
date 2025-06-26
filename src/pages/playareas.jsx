import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_API_URL, BACKEND_IMG_URL } from "src/utils/helper";
import { Link, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const itemsToShow =
    location.pathname !== "/playareas" ? playAreas.slice(0, 4) : playAreas;

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
        {itemsToShow.map((playArea) => (
          <div
            key={playArea.PLAYAREAID}
            className="bg-black rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Image */}
            <div
              className="h-56 w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${BACKEND_IMG_URL}${playArea.IMAGEURL})`,
              }}
            />

            {/* Content */}
            <div className="p-6 lg:p-8 space-y-5">
              {/* Name */}
              <h2 className="text-2xl text-pink font-bold">{playArea.NAME}</h2>

              {/* Description */}
              <p className="text-md leading-relaxed text-gray-300 text-justify">
                {playArea.DESCRIPTION}
              </p>

              {/* Info Grid */}
              <div className="flex justify-between text-white mt-4">
                <div>
                  <span className="font-semibold">Capacity:</span>{" "}
                  {playArea.CAPACITY} children
                </div>
                <div>
                  <span className="font-semibold">Rate/Hour:</span> ৳
                  {playArea.RATEPERHOUR}
                </div>
              </div>

              {/* Book Button discount */}
              <div className="flex justify-between items-center">
                {playArea.DISCOUNTRATE > 0 && (
                  <div className="col-span-2 text-green-400 font-medium">
                    🎉 {playArea.DISCOUNTRATE}% Discount Available!
                  </div>
                )}

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

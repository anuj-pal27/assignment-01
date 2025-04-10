import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CarCard = ({ car, isWishlisted, onWishlist }) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md p-4 relative transition-transform transform hover:scale-105 hover:shadow-lg duration-300 ease-in-out">
      <img
        src={car.image}
        alt={car.model}
        className="w-full h-40 object-cover rounded-md transition-transform duration-300 ease-in-out"
      />
      <button
        className="absolute top-3 right-3 text-red-500 text-xl transition-colors duration-300 ease-in-out"
        onClick={() => onWishlist(car.id)}
      >
        {isWishlisted ? <FaHeart /> : <FaRegHeart />}
      </button>
      <h2 className="text-lg font-bold mt-2">{car.brand} {car.model}</h2>
      <p>💲 {car.price.toLocaleString()}</p>
      <p>⛽ {car.fuel}</p>
      <p>🪑 Seats: {car.seating}</p>
    </div>
  );
};

export default CarCard;

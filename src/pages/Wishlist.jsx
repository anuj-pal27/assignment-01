import React, { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import { getWishlist, toggleWishlist } from "../utils/localStorage";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleToggleWishlist = (car) => {
    const updated = toggleWishlist(car);
    setWishlist(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-600">No cars in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isWishlisted
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

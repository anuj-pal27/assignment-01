import React, { useEffect, useState } from "react";
import Filters from "../components/Filters";
import CarCard from "../components/CarCard";
import carsData from "../data/carsData.json"
import { getWishlist,toggleWishlist } from "../utils/localStorage";

export default function Home(){
    const [filters,setFilters] = useState({});
    const [cars,setCars] = useState([]);
    const [wishlist,setWishlist] = useState(getWishlist());

    useEffect(()=>{
        setCars(carsData); 
    },[]);

    const filtered = cars.filter((car)=>{
        return (
            (!filters.brand || car.brand === filters.brand) &&
            (!filters.fuel || car.fuel === filters.fuel) &&
            (!filters.seating || car.seating === parseInt(filters.seating))
          );
    })

    const handleToggleWishlist = (car) => {
        const updated = toggleWishlist(car);
        setWishlist(updated);
      };

    return(
        <div>
            <h2> Car Finder</h2>
                  <Filters filters={filters} setFilters={setFilters} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {filtered.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            isWishlisted={wishlist.some((c) => c.id === car.id)}
            onToggleWishlist={handleToggleWishlist}
          />
        ))}
      </div>
        </div>
    )
}
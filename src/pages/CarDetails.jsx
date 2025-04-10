import React from "react";
import { useParams } from "react-router-dom";
import carsData from "../data/carsData.json";

export default function CarDetails() {
  const { id } = useParams();
  const car = carData.find((c) => c.id === parseInt(id));

  if (!car) return <div>Car not found</div>;

  return (
    <div>
      <h2>{car.brand} {car.model}</h2>
      <img src={car.image} alt={car.model} width={300} />
      <p>Price: ${car.price}</p>
      <p>Fuel: {car.fuel}</p>
      <p>Seating: {car.seating}</p>
      <p>{car.description}</p>
    </div>
  );
}

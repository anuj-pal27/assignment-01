import React, { useState } from "react";

const Filters = ({ cars, onFilter }) => {
  const [search, setSearch] = useState("");
  const [fuel, setFuel] = useState("");
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    let filtered = [...cars];

    if (search) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (fuel) filtered = filtered.filter((car) => car.fuel === fuel);
    if (brand) filtered = filtered.filter((car) => car.brand === brand);
    if (maxPrice) filtered = filtered.filter((car) => car.price <= maxPrice);

    onFilter(filtered);
  };

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white p-4 rounded-lg shadow-md grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <input
        type="text"
        placeholder="Search by model"
        className="border p-2 rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        onChange={(e) => setFuel(e.target.value)}
      >
        <option value="">All Fuel Types</option>
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Electric">Electric</option>
      </select>
      <select
        className="border p-2 rounded dark:bg-gray-800 dark:text-white"
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="">All Brands</option>
        {[...new Set(cars.map((c) => c.brand))].map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Max Price"
        className="border p-2 rounded"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 sm:col-span-2 lg:col-span-1"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;

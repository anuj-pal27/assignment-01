import React, { useState, useEffect } from "react";
import CarCard from "./components/CarCard";
import Filters from "./components/Filters";
import Pagination from "./components/Pagination";
import carsData from "./data/carsData.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMoon, FaSun } from "react-icons/fa";

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark" || false
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const carsPerPage = 10;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    setCars(carsData);
    setFilteredCars(carsData);
  }, []);

  // Handle sorting by price
  const handleSort = (order) => {
    setSortOrder(order);
    let sortedCars = [...filteredCars]; // Make a copy of filteredCars

    sortedCars.sort((a, b) => {
      if (order === "lowToHigh") {
        return a.price - b.price;
      } else if (order === "highToLow") {
        return b.price - a.price;
      }
      return 0;
    });

    setFilteredCars(sortedCars); // Update the filteredCars state with sorted array
  };

  const handleFilter = (filtered) => {
    setFilteredCars(filtered);
    setCurrentPage(1);
  };

  const handleWishlist = (carId) => {
    let updated;
    if (wishlist.includes(carId)) {
      updated = wishlist.filter((id) => id !== carId);
      toast.info("Removed from wishlist");
    } else {
      updated = [...wishlist, carId];
      toast.success("Added to wishlist");
    }
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  // Pagination logic
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4 text-center">Car Finder App 🚗</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-xl p-2"
          title="Toggle Dark Mode"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <div className="flex justify-end mb-4  ">
        {/* Sort Dropdown */}
        <select
          onChange={(e) => handleSort(e.target.value)}
          value={sortOrder}
          className="rounded-md dark:bg-gray-900 dark:text-white p-4"
        >
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <Filters cars={cars} onFilter={handleFilter} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {currentCars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            isWishlisted={wishlist.includes(car.id)}
            onWishlist={handleWishlist}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCars={filteredCars.length}
        carsPerPage={carsPerPage}
        onPageChange={setCurrentPage}
      />
      {/* ✅ Toast Container goes here */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default App;

import React from "react";

const Pagination = ({ currentPage, totalCars, carsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCars / carsPerPage);
  if (totalPages === 1) return null;

  return (
    <div className="mt-6 flex justify-center gap-2">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx}
          className={`px-3 py-1 rounded ${
            currentPage === idx + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => onPageChange(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

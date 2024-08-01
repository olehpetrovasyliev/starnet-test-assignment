"use client";

import { FC, useState } from "react";

interface PaginationControlsProps {
  page: number;
  prevPage: () => void;
  nextPage: () => void;

  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  page,
  prevPage,
  nextPage,
  hasNextPage,
  hasPrevPage,
}) => {
  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        className={`px-4 py-2 bg-gray-900 text-white rounded-lg ${
          !hasPrevPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
        onClick={prevPage}
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <span className="px-4 py-2 bg-gray-800 text-white rounded-lg">
        Page {page}
      </span>
      <button
        className={`px-4 py-2 bg-gray-900 text-white rounded-lg ${
          !hasNextPage ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
        }`}
        onClick={nextPage}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;

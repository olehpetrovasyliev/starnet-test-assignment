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
    <div className="flex gap-4  ml-auto mr-auto mt-10 w-20">
      <button onClick={prevPage} disabled={!hasPrevPage}>
        Prev
      </button>
      <div className="">{page}</div>
      <button onClick={nextPage} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
};

export default PaginationControls;

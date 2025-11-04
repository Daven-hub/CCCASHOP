import React from "react";

const LoaderProduitCard = () => {
  return (
    <div className="group border p-2 border-gray-100 bg-white rounded-[5px] animate-pulse">
      <div className="relative h-[200px] md:h-[265px] bg-gray-100 rounded-[5px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-[shimmer_1.5s_infinite]"></div>
      </div>

      <div className="py-3 px-2 flex flex-col gap-2">
        <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded w-1/2"></div>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-4 bg-gray-100 rounded w-1/3"></div>
          <div className="h-4 bg-gray-100 rounded w-1/6"></div>
        </div>

        <div className="mt-3 h-8 bg-gray-100 rounded-[6px] w-full"></div>
      </div>
    </div>
  );
};

export default LoaderProduitCard;

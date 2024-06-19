import React from "react";

// Define the props for the Pagination component
interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  totalItems: number;
}

// Define the Pagination component using the props
const Pagination: React.FC<PaginationProps> = ({ currentPage, itemsPerPage, onPageChange, totalItems }) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle page number change
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-between mt-4">
      <button 
        onClick={handlePreviousPage} 
        disabled={currentPage === 1} 
        className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1">
        Page {currentPage} of {totalPages}
      </span>
      <button 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages} 
        className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

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
          <div className="flex items-center justify-center mt-4">
               <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 mx-1 rounded-lg duration-150 ${currentPage === 1 ? '' :  'hover:bg-blue-800'} ${
                         currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                    }`}
               >
                    Previous
               </button>
               <p className="px-4 py-2 mx-1">
                    <span className="bg-gray-500 hover:bg-gray-400 py-1 px-3 text-white rounded-lg cursor-pointer">{currentPage}</span> of 
                    <span className="ml-2 bg-gray-500 hover:bg-gray-400 py-1 px-3 text-white rounded-lg cursor-pointer">{totalPages}</span>
               </p>
               <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 mx-1 rounded-lg duration-150 ${currentPage === totalPages ? '' :  'hover:bg-blue-800'} ${
                         currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"
                    }`}
               >
                    Next
               </button>
          </div>
     );
};

export default Pagination;

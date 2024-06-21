import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import Pagination from "../pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";

const NewsCard = () => {
     const { news} = useSelector((state: RootState) => state.categoryNews);
   

     // Handle hover on item.description
     const [hoveredItem, setHoveredItem] = useState<number | null>(null);

     const handleMouseEnter = (itemIndex: number) => {
          setHoveredItem(itemIndex);
     };

     const handleMouseLeave = () => {
          setHoveredItem(null);
     };

     // For changing the fav icon
     const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});

    const handleIconClick = (event: React.MouseEvent, itemId: number) => {
        event.stopPropagation();
        setFavoriteStates(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId],
        }));
    };

     const formatDate = (dateString: string) => {
          const givenDate = new Date(dateString);
          const currentDate = new Date();

          const diffInMs = currentDate.getTime() - givenDate.getTime();
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

          if (diffInDays === 0) {
               return givenDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
          } else if (diffInDays === 1) {
               return "1 day ago";
          } else if (diffInDays < 3) {
               return `${diffInDays} days ago`;
          } else {
               return givenDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
          }
     };
     const [newsData, setNewsData] = useState<any[]>([]);

     useEffect(() => {
          if (news.length === 0) {
               try {
                    fetch(import.meta.env.VITE_API_HEADLINES)
                         .then((res) => res.json())
                         .then((data) => setNewsData(data?.articles));
               } catch (error) {
                    alert(error);
               }
          }
     }, [news]);

     const [currentPage, setCurrentPage] = useState<number>(1);
     const itemPerPage = 16;

     const lastItemIndex = currentPage * itemPerPage;
     const firstItemIndex = lastItemIndex - itemPerPage;

     const dataSource = news.length > 0 ? news : newsData;
     const currentItem = dataSource?.slice(firstItemIndex, lastItemIndex);

     const handlePageChange = (pageNumber: number) => {
          setCurrentPage(pageNumber);
     };

     return (
          <section>
               <div>
                    <ul className="flex flex-wrap justify-between ">
                         {currentItem?.map((item, index) =>
                              !item.urlToImage || !item.title ? null : (
                                   <li
                                        key={index}
                                        className="w-full md:w-1/2 lg:w-1/4 py-1 md:p-2 cursor-pointer relative group"
                                        onClick={() => (window.location.href = item?.url)}
                                   >
                                        <div className="border p-4">
                                             <div
                                                  className="text-red-500 bg-white py-2 px-2 rounded-lg absolute right-4 top-6 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                  onClick={(event) => handleIconClick(event, index)}
                                             >
                                               {favoriteStates[index] ? <FaHeart /> : <FaRegHeart />}
                                             </div>
                                             {item?.urlToImage && (
                                                  <img
                                                       src={item?.urlToImage}
                                                       className="w-full h-48 flex-wrap object-cover mb-4 rounded-md group-hover:h-24 duration-500"
                                                  />
                                             )}
                                             {item?.title && (
                                                  <p className="font-bold text-xl mb-2 group-hover:text-lg">
                                                       {item.title.length > 37 ? item.title.slice(0, 37) : item.title}
                                                  </p>
                                             )}
                                             {item?.description && (
                                                  <p
                                                       key={index}
                                                       className={`mb-2 duration-500 ${
                                                            hoveredItem === index ? " delay-500" : ""
                                                       }`}
                                                       onMouseEnter={() => handleMouseEnter(index)}
                                                       onMouseLeave={handleMouseLeave}
                                                  >
                                                       {hoveredItem === index
                                                            ? item?.description
                                                            : item?.description.length > 105
                                                            ? item?.description.slice(0, 105) + "..."
                                                            : item?.description}
                                                  </p>
                                             )}
                                             <div className="flex justify-between">
                                                  {item.author && (
                                                       <span className="text-sm text-red-500">
                                                            {item?.author.length > 15
                                                                 ? item.author.slice(0, 15)
                                                                 : item.author}
                                                       </span>
                                                  )}
                                                  {item.publishedAt && (
                                                       <span className="text-sm">• {formatDate(item?.publishedAt)}</span>
                                                  )}
                                             </div>
                                        </div>
                                   </li>
                              )
                         )}
                    </ul>
                    <Pagination
                         currentPage={currentPage}
                         itemsPerPage={itemPerPage}
                         onPageChange={handlePageChange}
                         totalItems={dataSource?.length}
                    />
               </div>
          </section>
     );
};

export default NewsCard;

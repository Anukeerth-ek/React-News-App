import { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

const NewsCard = () => {
    // handle hover on item.description
     const [hoveredItem, setHoveredItem] = useState(null);

     // Event handler to set hoveredItem to the item id on mouse enter
     const handleMouseEnter = (itemIndex:any) => {
          setHoveredItem(itemIndex);
     };

     // Event handler to reset hoveredItem to null on mouse leave
     const handleMouseLeave = () => {
          setHoveredItem(null);
     };

    //  for changing the fav icon

const [toggleFavIcon, setToggleFavIcon] = useState(false)

const handleIconClick = (event:any) => {
     event.stopPropagation();
     setToggleFavIcon(!toggleFavIcon);
 };




     const [newsData, setNewsData] = useState<any>([]);
     console.log("data", newsData);

     const formatDate = (dateString: string) => {
          const givenDate = new Date(dateString);
          const currentDate = new Date();

          const diffInMs = currentDate.getTime() - givenDate.getTime();
          const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

          if (diffInDays === 0) {
               // Today
               return givenDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
          } else if (diffInDays === 1) {
               // 1 day ago
               return "1 day ago";
          } else if (diffInDays < 3) {
               // N days ago
               return `${diffInDays} days ago`;
          } else {
               // Format the date as Month-DD-YYYY for dates older than 3 days
               return givenDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
          }
     };

     useEffect(() => {
          try {
               fetch(import.meta.env.VITE_API_HEADLINES)
                    .then((res) => res.json())
                    .then((data) => setNewsData(data.articles));
          } catch (error) {
               console.log("Error is ", error);
          }
     }, []);

     return (
          <section>
               <div>
                    <ul className="flex flex-wrap justify-between ">
                         {newsData.slice(1).map((item: any, index: number) =>
                              // Skip rendering if urlToImage or title is empty
                              !item.urlToImage || !item.title ? null : (
                                
                                   <li
                                        key={index}
                                        className="w-full md:w-1/2 lg:w-1/4 py-1 md:p-2 cursor-pointer relative group"
                                        onClick={()=> window.location.href=item.url}
                                   >
                                        <div className="border p-4">
                                             <div className="text-red-500 bg-white py-2 px-2 rounded-lg absolute right-4 top-6 text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                      onClick={()=> handleIconClick(index)}
                                             >
                                              {toggleFavIcon ? <FaHeart/> : <FaRegHeart />}
                                             </div>
                                             {item.urlToImage && (
                                                  <img
                                                       src={item.urlToImage}
                                                       
                                                       className="w-full h-48 flex-wrap object-cover mb-4 rounded-md group-hover:h-24 duration-500 "
                                                  />
                                             )}
                                             {item.title && (
                                                  <p className="font-bold text-xl mb-2 group-hover:text-lg">
                                                       {item.title.length > 37 ? item.title.slice(0, 37) : item.title}
                                                  </p>
                                             )}
                                             {item.description && (
                                                  <p
                                                       key={index}
                                                       className={`mb-2 duration-500  ${
                                                            hoveredItem === index ? " delay-500" : ""
                                                       }`}
                                                       onMouseEnter={() => handleMouseEnter(index)}
                                                       onMouseLeave={handleMouseLeave}
                                                  >
                                                       {hoveredItem === index
                                                            ? item.description // Show full description when hovered
                                                            : item.description.length > 105
                                                            ? item.description.slice(0, 105) + "..." // Truncate description
                                                            : item.description}
                                                  </p>
                                             )}
                                             <div className="flex justify-between">
                                                  {item.author && (
                                                       <span className="text-sm text-red-500">{item.author}</span>
                                                  )}
                                                  {item.publishedAt && (
                                                       <span className="text-sm">• {formatDate(item.publishedAt)}</span>
                                                  )}
                                             </div>
                                        </div>
                                   </li>
                                
                              )
                         )}
                    </ul>
               </div>
          </section>
     );
};

export default NewsCard;

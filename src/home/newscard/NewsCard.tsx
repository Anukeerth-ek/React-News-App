import { useEffect, useState } from "react";

const NewsCard = () => {
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
                                   <li key={index} className="w-full md:w-1/2 lg:w-1/4 py-1 md:p-2 ">
                                        <div className="border p-4">
                                             {item.urlToImage && (
                                                  <img
                                                       src={item.urlToImage}
                                                       alt={`News ${index}`}
                                                       className="w-full h-48 object-cover mb-4 rounded-md"
                                                  />
                                             )}
                                             {item.title && (
                                                  <p className="font-bold text-xl mb-2">
                                                       {item.title.length > 37 ? item.title.slice(0, 37) : item.title}
                                                  </p>
                                             )}
                                             {item.description && (
                                                  <p className="mb-2">
                                                       {item.description.length > 136
                                                            ? item.description.slice(0, 136) + "..."
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

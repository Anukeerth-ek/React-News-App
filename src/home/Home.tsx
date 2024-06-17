import NewsCard from "./newscard/NewsCard";
import { IoMdArrowDropdown } from "react-icons/io";

const Home = () => {
     return (
          <div className="p-3 md:px-24 ">
               <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-3xl font-bold">Latest News</h2>
                    <IoMdArrowDropdown />
               </div>
               <NewsCard />
          </div>
     );
};

export default Home;

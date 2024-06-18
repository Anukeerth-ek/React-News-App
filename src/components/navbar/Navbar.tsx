import { Link } from "react-router-dom";
import { navLinks } from "../../utils/Data";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CiMenuFries } from "react-icons/ci";
import { RxCross1 } from "react-icons/rx";
import { IoMdArrowDropdown } from "react-icons/io";

import { useState } from "react";

const Navbar = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     // for toggling menu
     const handleToggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
     };

     // for dropown
     const [showDropdown, setShowDropdown] = useState(false);
     return (
          <header>
               <nav>
                    <div className="flex flex-wrap items-center justify-between md:justify-around py-5 dark:bg-blue-950 text-white px-3 md:px-0">
                         <h3 className="text-lg md:text-2xl font-bold">News 24</h3>
                         <div className="flex items-center relative  md:w-60">
                              <input
                                   type="text"
                                   className="border border-orange-400 w-full py-1 rounded-md hidden md:block"
                              />
                              <div className="md:absolute md:right-3 text-black  bg-white p-1 rounded-lg md:rounded-none text-xl">
                                   <IoSearch />
                              </div>
                         </div>

                         <div className=" hidden md:inline">
                              <ul className="flex ">
                                   {navLinks.map((item, index) => {
                                        return (
                                             <>
                                                  <Link to={item?.path} key={index} className="relative">
                                                       <li
                                                            className=" ml-8 text-black md:text-white inline-flex items-center "
                                                            onMouseEnter={() => setShowDropdown(true)}
                                                            onMouseLeave={() => setShowDropdown(false)}
                                                       >
                                                            {item?.link}
                                                            {item?.downArrow && (
                                                                 <span className="text-xl">
                                                                      <IoMdArrowDropdown />
                                                                 </span>
                                                            )}
                                                       </li>
                                                  </Link>
                                                  {item.downArrow && showDropdown ? (
                                                       <div className="absolute top-8 flex flex-col bg-white text-black">
                                                            <span>hello</span>
                                                            <span>world</span>
                                                            <span>software</span>
                                                       </div>
                                                  ) : (
                                                       ""
                                                  )}
                                             </>
                                        );
                                   })}
                              </ul>
                         </div>
                         {/* FOR SAVED POST */}
                         <div className="flex items-center lg:border rounded-md px-2 py-[2px]">
                              <span className="hidden lg:block lg:mr-1">Saved Post</span>
                              <div className="text-black lg:text-white bg-white lg:bg-transparent  text-lg p-1 relative right-5 md:static rounded-md">
                                   <FaRegHeart />
                              </div>
                         </div>
                         {/* FOR MOBILE VIEW HAMBURGER ICON AND CROSS ICON  */}
                         <div className="md:hidden">
                              <button onClick={handleToggleMenu} className={isMenuOpen ? " text-black" : ""}>
                                   {isMenuOpen ? (
                                        <div className="relative z-50 top-[6px]">
                                             <RxCross1 />
                                        </div>
                                   ) : (
                                        <CiMenuFries />
                                   )}
                              </button>
                         </div>
                    </div>
                    {/* for mobile view */}
                    <div
                         className={`${
                              isMenuOpen ? "flex flex-col absolute right-0 top-5 bg-white  z-10 text-black w-28" : "hidden"
                         }`}
                    >
                         <ul className={`${isMenuOpen ? "flex flex-col" : ""}`}>
                              {navLinks.map((item, index) => {
                                   return (
                                        <Link to={item?.path} key={index}>
                                             <li className=" mb-2 text-black md:text-white py-[6px] px-4 hover:bg-gray-200">
                                                  {item?.link}
                                             </li>
                                        </Link>
                                   );
                              })}
                         </ul>
                    </div>
               </nav>
          </header>
     );
};

export default Navbar;

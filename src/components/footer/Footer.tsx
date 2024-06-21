import { footerLink } from "../../utils/Data";

const Footer = () => {
     return (
          <footer className="bg-white w-full  shadow dark:bg-blue-950 mt-8">
               <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                    <div className="flex items-center justify-between">
                         <a href="#" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                              <img
                                   src="https://www.svgrepo.com/show/281696/news.svg"
                                   className="h-6 md:h-8"
                                   alt="Flowbite Logo"
                              />
                              <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">
                                   News24
                              </span>
                         </a>
                         <ul className="flex flex-wrap items-center ml-6 mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                              {footerLink.map((item, index) => (
                                   <li
                                        className="flex flex-wrap items-center  text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
                                        key={index}
                                   >
                                        <a href="#" className="hover:underline me-2 md:me-6">
                                             {item.link}
                                        </a>
                                   </li>
                              ))}
                         </ul>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
                         © 2024
                         <a href="#" className="hover:underline">
                              News24
                         </a>
                         . All Rights Reserved.
                    </span>
               </div>
          </footer>
     );
};

export default Footer;

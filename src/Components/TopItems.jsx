import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { motion } from 'motion/react';
import axios from "axios";
import { AuthContext } from "../Contexts/Authprovider.jsx";
import Loading from "./Loading.jsx";

const TopItems = () => {
  const { saveUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestItems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/items?sort=date_desc&limit=6`);
        const sorted = response.data.sort((a, b) => b.date.localeCompare(a.date));
        setItems(sorted.slice(0, 6));
      } catch (error) {
        console.error("Error fetching latest items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestItems();
  }, []);

  if (loading) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center h-64"
        >
          <Loading />
        </motion.div>
    );
  }

  return (
      <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full py-12"
      >
        <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-gray-100 bg-clip-text "
        >
          Latest Lost & Found Items
        </motion.h2>

        {items.length === 0 ? (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                No items found
              </p>
              {saveUser && (
                  <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate("/addItems")}
                      className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
                  >
                    <span>Add New Item</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
              )}
            </motion.div>
        ) : (
            <>
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {items.map((item, index) => (
                    <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-full ${
                            index === 0 ? "border-2 border-violet-500" : ""
                        }`}
                    >
                      {index === 0 && (
                          <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, ease: 'easeOut' }}
                              whileHover={{ scale: 1.1, backgroundColor: '#7C3AED' }}
                              className="absolute top-0 left-0 bg-violet-600 text-white text-xs font-semibold px-2 py-1 rounded-br-lg"
                          >
                            Latest
                          </motion.span>
                      )}

                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
                        {item.thumbnail ? (
                            <motion.img
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = "";
                                  e.target.className = "w-full h-full object-contain p-4";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                              No Image
                            </div>
                        )}
                      </div>

                      <div className="p-5 flex flex-col flex-1 items-start">
                        <div>
                          {item.status === "Recovered" ? (
                              <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                  className="inline-block mb-2 px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400"
                              >
                                Recovered
                              </motion.span>
                          ) : (
                              <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                  className={`inline-block mb-2 px-3 py-1 text-sm font-semibold rounded-full ${
                                      item.postType === "Lost"
                                          ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400"
                                          : "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400"
                                  }`}
                              >
                                {item.postType}
                              </motion.span>
                          )}
                        </div>

                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1 mb-2"
                        >
                          {item.title}
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4"
                        >
                          {item.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mt-auto w-full"
                        >
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-1">
                            <span className="font-medium text-gray-800 dark:text-gray-200">Date & Time:</span>
                            <span className="text-gray-900 dark:text-gray-100">
                        {new Date(item.date).toLocaleString("en-BN", {
                          day: "2-digit",
                        })}{" "}
                              {new Date(item.date).toLocaleString("en-BN", {
                                month: "short",
                              })}{" "}
                              {new Date(item.date).toLocaleString("en-BN", {
                                year: "numeric",
                              })}{" "}
                              at{" "}
                              {new Date(item.date).toLocaleString("en-BN", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                      </span>
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-800 dark:text-gray-200">Location:</span> <span className="text-gray-900 dark:text-gray-100">{item.location}</span>
                          </p>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(`/items/${item._id}`)}
                            className="group mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
                        >
                            <span>See More</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.button>
                      </div>
                    </motion.div>
                ))}
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mt-10"
              >
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/allItems")}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
                >
                  <span>See All Lost & Found Items</span>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </motion.div>
            </>
        )}
      </motion.section>
  );
};

export default TopItems;
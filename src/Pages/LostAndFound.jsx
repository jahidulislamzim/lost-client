import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Contexts/Authprovider.jsx';
import Loading from '../Components/Loading.jsx';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const LostAndFound = () => {
  const { saveUser } = useContext(AuthContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/allItem`, {
          params: { search: searchQuery, filter },
        });
        setFilteredItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [filter, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <Loading />;

  return (
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full py-12">
        <Helmet>
          <title>Lost & Found</title>
        </Helmet>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            All Lost & Found Items
          </h1>

          <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
                type="text"
                placeholder="🔎 Search by title or location..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full max-w-xs border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full max-w-xs border border-gray-300 dark:border-gray-600 p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Items</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
              <option value="Recovered">Recovered</option>
            </select>
          </div>

          {filteredItems.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg">
                  No items found
                </p>
                {saveUser && (
                    <button
                        onClick={() => navigate("/addItems")}
                        className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200"
                    >
                      <span>Add New Item</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                )}
              </div>
          ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-105 flex flex-col h-full"
                    >
                      <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-t-xl overflow-hidden">
                        {item.thumbnail ? (
                            <img
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
                          {item.status === 'Recovered' ? (
                              <span className="inline-block mb-2 px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400">
                        Recovered
                      </span>
                          ) : (
                              <span
                                  className={`inline-block mb-2 px-3 py-1 text-sm font-semibold rounded-full ${
                                      item.postType === 'Lost'
                                          ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
                                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                                  }`}
                              >
                        {item.postType}
                      </span>
                          )}
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1 mb-2">
                          {item.title}
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                          {item.description}
                        </p>

                        <div className="mt-auto w-full">
                          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-1">
                            <span className="font-medium text-gray-800 dark:text-gray-200">Date & Time:</span>
                            <span className="text-gray-900 dark:text-gray-100">
                        {new Date(item.date).toLocaleString('en-BN', {
                          day: '2-digit',
                        })}{' '}
                              {new Date(item.date).toLocaleString('en-BN', {
                                month: 'short',
                              })}{' '}
                              {new Date(item.date).toLocaleString('en-BN', {
                                year: 'numeric',
                              })}{' '}
                              at{' '}
                              {new Date(item.date).toLocaleString('en-BN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                      </span>
                          </p>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-medium text-gray-800 dark:text-gray-200">Location:</span> <span className="text-gray-900 dark:text-gray-100">{item.location}</span>
                          </p>
                        </div>

                        <Link to={`/items/${item._id}`}>
                          <button className="group mt-4 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all duration-200">
                            <span>See More</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                ))}
              </div>
          )}
        </div>
      </section>
  );
};

export default LostAndFound;
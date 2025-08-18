import { motion } from 'motion/react';
import {Link} from 'react-router';
import React from 'react';

const ExtraTwo = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl"
        >
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 text-center"
            >
                Success Stories
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    {
                        title: 'Lost Laptop Recovered',
                        desc: 'I posted about my lost laptop, and within a day, someone found it at a café and returned it!',
                        author: 'Anika, Dhaka',
                        image: 'https://burntorangesolutions.com/wp-content/uploads/2018/09/laptop-thief.jpg',
                    },
                    {
                        title: 'Found Family Heirloom',
                        desc: 'Thanks to this platform, I returned a precious ring to its owner who thought it was gone forever.',
                        author: 'Imran, Sylhet',
                        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
                    },
                    {
                        title: 'Reunited with My Camera',
                        desc: 'Lost my camera during a trip, but someone posted it here, and I got it back in perfect condition!',
                        author: 'Tania, Chittagong',
                        image: 'https://images.unsplash.com/photo-1508780709619-79562169bc64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
                    },
                ].map((story, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                    >
                        <img
                            src={story.image}
                            alt={story.title}
                            className="w-full h-40 object-cover brightness-75"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                                {story.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                {story.desc}
                            </p>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                - {story.author}
                            </p>
                            <Link
                                to="/success-stories"
                                className="group mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all"
                            >
                                <span>Read More</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex justify-center mt-10"
            >
                <Link
                    to="/allItems"
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-white font-semibold shadow-md hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all"
                >
                    <span>View All Stories</span>
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
                </Link>
            </motion.div>
        </motion.section>
    );
};

export default ExtraTwo;
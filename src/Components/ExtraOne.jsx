import { motion } from 'motion/react';
import React from 'react';

const ExtraOne = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full mb-20 py-16 bg-white dark:bg-gray-900 rounded-2xl shadow-xl"
        >
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-10 text-center"
            >
                Our Impact
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                    {
                        title: '10,000+ Items Recovered',
                        desc: 'Our platform has helped reunite thousands of lost items with their owners.',
                        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                    },
                    {
                        title: 'Global Community',
                        desc: 'Connect with users worldwide to report and recover lost belongings.',
                        icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012-2v-1a2 2 0 012-2h2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                    },
                    {
                        title: '24/7 Support',
                        desc: 'Our team is here to assist you anytime, ensuring a smooth experience.',
                        icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536-3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
                    },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                        className="relative bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center hover:shadow-2xl transition-shadow duration-300"
                    >
                        <svg
                            className="w-12 h-12 mx-auto mb-4 text-indigo-600 dark:text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={stat.icon}
                            />
                        </svg>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                            {stat.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            {stat.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    );
};

export default ExtraOne;
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router';

const banners = [
    {
        id: 1,
        image: 'https://www.nebeep.com/content/uploads/2019/09/50-forgotten-places-to-look-when-you-lose-something.jpg',
        alt: 'Lost Keys',
        title: 'Lost Something? Find It Here!',
        subtitle: 'Report your lost items and reconnect with what matters.',
    },
    {
        id: 2,
        image: 'https://vantagepointrecovery.com/wp-content/uploads/2020/05/bigstock-Helping-Hand-1682222-1024x768.jpg',
        alt: 'Found Wallet',
        title: 'Found an Item? Help Others!',
        subtitle: 'Post found items and help reunite them with their owners.',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
        alt: 'Lost Pet',
        title: 'Reunite with Your Loved Ones',
        subtitle: 'From pets to personal items, we help you recover what’s yours.',
    },
];

export default function Banner() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);
    const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);

    return (
        <div
            className="relative w-screen with mx-[calc(49.5%-50vw)] h-[400px] sm:h-[500px] md:h-[650px] overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {banners.map((banner, index) => (
                <div
                    key={banner.id}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-1000 ease-in-out ${
                        index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                    }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.alt}
                        className="w-full h-full object-cover brightness-75"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                        <div className="relative max-w-3xl px-4">
                            <h2
                                className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 drop-shadow-2xl ${
                                    index === current ? 'animate-slideIn' : ''
                                }`}
                            >
                                {banner.title}
                            </h2>
                            <p
                                className={`text-lg sm:text-xl md:text-2xl font-medium mb-8 drop-shadow-lg ${
                                    index === current ? 'animate-slideIn' : ''
                                }`}
                            >
                                {banner.subtitle}
                            </p>
                            <div className='text-end'>
                                <button
                                    className={`px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                                        index === current ? 'animate-bounceIn' : ''
                                    }`}
                                >
                                    <Link to="/allItems" className="text-white">
                                        Find Now
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Previous slide"
            >
                <ChevronLeftIcon className="w-8 h-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-900/90 p-4 rounded-full text-white z-10 transition-all duration-300 hover:scale-110 shadow-md"
                aria-label="Next slide"
            >
                <ChevronRightIcon className="w-8 h-8" />
            </button>

            <style>
                {`
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    @keyframes bounceIn {
                        from {
                            opacity: 0;
                            transform: scale(0.8);
                        }
                        to {
                            opacity: 1;
                            transform: scale(1);
                        }
                    }
                    .animate-slideIn {
                        animation: slideIn 0.8s ease-out;
                    }
                    .animate-bounceIn {
                        animation: bounceIn 0.6s ease-out;
                    }
                `}
            </style>
        </div>
    );
}
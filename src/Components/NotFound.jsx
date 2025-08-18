import { Link } from 'react-router';
import { useState, useEffect } from 'react';

const NotFound = () => {
    const [particles, setParticles] = useState([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 60 + 250}, 70%, 60%)`,
            opacity: Math.random() * 0.6 + 0.3
        }));
        setParticles(newParticles);

        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-purple-950 dark:to-black flex items-center justify-center px-4">
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 opacity-70">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
            </div>

            {/* Interactive particle system */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className="absolute rounded-full animate-pulse"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            background: `radial-gradient(circle, ${particle.color}, transparent)`,
                            opacity: particle.opacity,
                            animationDelay: `${particle.id * 100}ms`,
                            animationDuration: `${particle.speed}s`,
                            transform: `translate(${(mousePosition.x - 50) * 0.1}px, ${(mousePosition.y - 50) * 0.1}px)`
                        }}
                    />
                ))}
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute opacity-20 animate-spin"
                        style={{
                            left: `${15 + (i * 12)}%`,
                            top: `${20 + (i * 8)}%`,
                            animationDuration: `${20 + i * 5}s`,
                            animationDirection: i % 2 ? 'reverse' : 'normal'
                        }}
                    >
                        <div className="w-16 h-16 border-2 border-white/30 transform rotate-45" />
                    </div>
                ))}
            </div>

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Glowing orb behind 404 */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-96 h-96 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                </div>

                {/* Main 404 with crazy effects */}
                <div className="relative mb-8">
                    <h1 className="text-[10rem] sm:text-[12rem] lg:text-[16rem] font-black tracking-tighter leading-none">
                        {/* Glowing text effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm">
                            404
                        </span>
                        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
                            4
                            <span className="inline-block animate-bounce mx-2" style={{ animationDelay: '0.5s' }}>0</span>
                            4
                        </span>

                        {/* Floating elements around numbers */}
                        <div className="absolute -top-10 left-0 text-6xl animate-bounce opacity-60" style={{ animationDelay: '1s' }}>✨</div>
                        <div className="absolute -top-10 right-0 text-6xl animate-bounce opacity-60" style={{ animationDelay: '2s' }}>💫</div>
                        <div className="absolute bottom-0 left-1/4 text-4xl animate-pulse opacity-40">🌟</div>
                        <div className="absolute bottom-0 right-1/4 text-4xl animate-pulse opacity-40">⚡</div>
                    </h1>
                </div>

                {/* Glassmorphism content card */}
                <div className="relative backdrop-blur-xl bg-white/10 dark:bg-white/5 rounded-3xl border border-white/20 p-8 mb-10 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl" />

                    <h2 className="text-4xl sm:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                            Lost in the Digital Cosmos! 🚀
                        </span>
                    </h2>

                    <p className="text-xl sm:text-2xl text-white/80 mb-2 max-w-2xl mx-auto leading-relaxed">
                        This page seems to have vanished into a parallel dimension.
                    </p>
                    <p className="text-lg text-white/60 max-w-xl mx-auto">
                        But don't worry, our navigation system will guide you back to safety! ✨
                    </p>
                </div>

                {/* Ultra-modern button group */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        to="/"
                        className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative rounded-xl bg-black/50 backdrop-blur-xl px-8 py-4 text-white font-bold text-lg flex items-center gap-3">
                            <span className="text-2xl">🏠</span>
                            <span>Take Me Home</span>
                            <svg className="w-6 h-6 transform transition-transform duration-300 group-hover:translate-x-2 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </Link>

                    <Link
                        to="/allItems"
                        className="group relative overflow-hidden rounded-2xl border-2 border-white/30 backdrop-blur-xl bg-white/10 px-8 py-4 text-white font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
                    >
                        <span className="text-2xl">🔍</span>
                        <span>Explore Items</span>
                        <div className="w-6 h-6 border-2 border-current rounded-full relative">
                            <div className="absolute -top-1 -right-1 w-2 h-2 border-2 border-current transform rotate-45" />
                        </div>
                    </Link>
                </div>

                {/* Floating action elements */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg className="relative block w-full h-20 text-white/10" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" />
                </svg>
            </div>

            <style jsx>{`
                @keyframes float-up {
                    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
                }
                
                @keyframes glow {
                    0%, 100% { text-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
                    50% { text-shadow: 0 0 40px rgba(168, 85, 247, 0.8), 0 0 60px rgba(168, 85, 247, 0.6); }
                }
                
                h1 {
                    animation: glow 3s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default NotFound;
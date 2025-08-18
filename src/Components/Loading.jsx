import React from 'react';
import Lottie from 'lottie-react';
import load from '../assets/loading.json'


const Loading = () => {
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Lottie animationData={load} loop={true} className='w-72 h-72' />
        </div>
    );
};

export default Loading;
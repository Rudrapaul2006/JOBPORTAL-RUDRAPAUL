import React, { useState } from 'react'

let HeroSection = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 py-10 bg-white">

                <h4 className="mt-6 bg-gray-100 text-red-500 font-bold px-6 sm:px-10 md:px-16 py-2 rounded-full text-sm sm:text-base">
                    No. One Job Hunt
                </h4>

                <div className="mt-5 sm:mt-6 md:mt-8">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                        Search And Apply &
                    </h2>

                    <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2">
                        Get Your <span className="text-emerald-600">Dream Job</span>
                    </h1>
                </div>

                <p className="mt-4 sm:mt-5 text-gray-500 max-w-xl sm:max-w-2xl text-sm sm:text-base md:text-lg">
                    Discover thousands of opportunities across industries and kickstart your career journey today
                </p>

            </div>


        </>
    )
}

export default HeroSection

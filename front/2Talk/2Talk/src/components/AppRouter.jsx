import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { publick_routes } from '../routes';
import { useState, useEffect } from 'react';

export const AppRouter = () => {

    const location = useLocation();

    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransistionStage] = useState("fadeIn");

    useEffect(() => {
        if (location !== displayLocation) setTransistionStage("fadeOut");
    }, [location, displayLocation]);

    return (
        <>
            <div
                className={`content_wrapper ${transitionStage}`}
                onAnimationEnd={() => {
                    if (transitionStage === "fadeOut") {
                        setTransistionStage("fadeIn");
                        setDisplayLocation(location);
                    }
                }}
            >
                <Routes location={displayLocation}>

                    {publick_routes.map(({ path, Component }, index) => (
                        <Route key={index} path={path} element={<Component />}></Route>
                    ))}

                </Routes>
            </div>
        </>
    )
}

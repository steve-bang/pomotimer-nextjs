'use client'

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Maximize2, Minimize2 } from 'lucide-react';

const FullscreenButton: React.FC = () => {

    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullScreen = () => {
        if (isFullscreen) {
            // Exit fullscreen
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
            setIsFullscreen(false);
        }
        else {
            const element = document.documentElement; // Fullscreen the entire page
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }

            setIsFullscreen(true);
        }
    };

    return (
        <Button onClick={handleFullScreen} variant="link" size="icon" className='text-white'>
            {isFullscreen ? <Minimize2 /> : <Maximize2 />}
        </Button>
    );
};

export default FullscreenButton;

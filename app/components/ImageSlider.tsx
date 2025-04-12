'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

export default function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex]}
              alt={`Memory ${currentIndex + 1}`}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              onLoadingComplete={() => {}}
              sizes="100vw"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 
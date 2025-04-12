'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  interval?: number;
}

export default function ImageSlider({ images, interval = 3000 }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-full">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Memory ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            onLoadingComplete={() => index === 0 && setIsLoading(false)}
            sizes="100vw"
          />
        </div>
      ))}
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
} 
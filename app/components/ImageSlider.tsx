'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[100vh]">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src={images[currentIndex]}
        alt={`Memory ${currentIndex + 1}`}
        fill
        sizes="100vw"
        className="object-cover"
        priority={currentIndex === 0}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
} 
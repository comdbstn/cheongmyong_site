'use client';

import { useState, useEffect, useRef } from "react";
import AnimatedSection from "./components/AnimatedSection";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 9;
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 스크롤 이벤트 처리
  useEffect(() => {
    const handleScroll = () => {
      const newSection = Math.round(window.scrollY / window.innerHeight);
      setCurrentSection(newSection);
      
      // 비디오 섹션 처리 (섹션 6)
      if (newSection === 5) {
        setIsVideoVisible(true);
      } else {
        setIsVideoVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 이미지 배열 생성
  const memoryImages = Array.from({ length: 24 }, (_, i) => `/images/memories/image${i + 1}.png`);

  const sections = [
    "순간들의 기억으로 우리는 살아갑니다.",
    "청명은 그런 기억들을 청춘이라는 이름으로 꽉꽉 눌러담아 왔습니다.",
    "그런 아름다운 시간들은 흐르고 흘러",
    "벌써 1주년이 되었습니다.",
    "청명은 평생을 추억할만한 날들을 살아가는 청춘들의 이야기입니다."
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <main className="relative">
      {/* Sections 1-5 */}
      {sections.map((text, index) => (
        <section key={index} className="h-screen flex items-center justify-center bg-black text-white relative">
          <AnimatedSection className="relative z-20 text-center w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1200px] mx-auto px-4">
            <p className="text-3xl md:text-5xl lg:text-7xl font-light leading-relaxed tracking-wide">
              {text}
            </p>
          </AnimatedSection>
        </section>
      ))}

      {/* Section 3 (Image Slider) */}
      <section className="h-screen bg-black text-white relative">
        <div className="absolute inset-0">
          <ImageSlider images={memoryImages} />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6 py-8 bg-black/50 backdrop-blur-sm rounded-2xl">
            <h2 className="text-6xl font-bold mb-6">우리의 추억</h2>
            <p className="text-xl">함께한 시간들을 돌아보며</p>
          </div>
        </div>
      </section>

      {/* Section 6 (Video Background) */}
      <section className="h-screen relative">
        <div className="absolute inset-0">
          {isVideoVisible && (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/background.mp4" type="video/mp4" />
            </video>
          )}
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl font-bold mb-6 text-white">새로운 시작</h2>
            <p className="text-xl text-white">우리의 새로운 여정이 시작됩니다</p>
          </div>
        </div>
      </section>

      {/* Section 7: Invitation */}
      <section className="h-screen flex items-center justify-center relative snap-start">
        <AnimatedSection className="relative z-20 text-center max-w-6xl mx-auto px-4">
          <p className="text-5xl md:text-7xl font-light tracking-wide leading-relaxed text-white">
            밝고, 맑고, 푸른 날에 함께해주세요.
          </p>
        </AnimatedSection>
      </section>

      {/* Section 8: Poster */}
      <section className="h-screen flex items-center justify-center relative snap-start">
        <div className="relative z-20 max-w-4xl mx-auto px-4 py-20">
          <AnimatedSection>
            <div className="relative max-w-lg mx-auto">
              <div className="aspect-[3/4] relative bg-blue-900/50 rounded-lg shadow-2xl flex items-center justify-center">
                <p className="text-4xl md:text-5xl text-white text-center p-8">
                  공연 포스터 준비 중
                </p>
              </div>
              <div className="mt-12 text-center text-white">
                <p className="text-3xl md:text-4xl mb-4">맑고 흐림이 없는 그런 날,</p>
                <p className="text-3xl md:text-4xl mb-8">BAND청명 단독 공연</p>
                <p className="text-2xl md:text-3xl mt-8">2025.05.04 오후 7시</p>
                <p className="text-2xl md:text-3xl">강남 필소라이브홀</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 9: Registration Form */}
      <section className="h-screen flex items-center justify-center relative snap-start">
        <AnimatedSection className="relative z-20 max-w-2xl mx-auto px-4 py-20">
          <div className="bg-white/90 rounded-xl p-8 backdrop-blur-sm">
            <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center">참가 신청</h2>
            <form className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-2xl font-medium text-gray-700 mb-2">이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-2 block w-full rounded-md border px-4 py-3 text-xl focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-2xl font-medium text-gray-700 mb-2">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 block w-full rounded-md border px-4 py-3 text-xl focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-2xl font-medium text-gray-700 mb-2">연락처</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="mt-2 block w-full rounded-md border px-4 py-3 text-xl focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-md hover:bg-blue-700 transition-colors text-2xl font-medium mt-8"
              >
                신청하기
              </button>
            </form>
          </div>
        </AnimatedSection>
      </section>

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 space-y-3 z-50">
        {[...Array(totalSections)].map((_, i) => (
          <button
            key={i}
            onClick={() => {
              window.scrollTo({
                top: i * window.innerHeight,
                behavior: 'smooth'
              });
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === i ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </main>
  );
}

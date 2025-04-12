'use client';

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import AnimatedSection from "./components/AnimatedSection";
import ImageSlider from "./components/ImageSlider";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const totalSections = 9;
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const newSection = Math.round(window.scrollY / window.innerHeight);
      setCurrentSection(newSection);
      if (newSection >= 5 && newSection <= 8) {
        setIsVideoVisible(true);
        setTimeout(() => setIsBackgroundOpen(true), 100);
      } else {
        setIsBackgroundOpen(false);
        setTimeout(() => setIsVideoVisible(false), 500);
      }
    };

    const initialize = () => {
      handleScroll();
      setIsInitialized(true);
    };

    window.addEventListener('scroll', handleScroll);
    initialize();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 이미지 슬라이더용 이미지 배열 - 실제 이미지 경로 수정
  const memoryImages = Array.from({ length: 24 }, (_, i) => `/images/memories/image${i + 1}.png`);

  // 이미지 프리로딩
  useEffect(() => {
    memoryImages.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
    });
  }, [memoryImages]);

  // 비디오 로딩
  useEffect(() => {
    try {
      if (isVideoVisible && videoRef.current) {
        videoRef.current.load();
        console.log('비디오 로딩 시도...');
        
        videoRef.current.onloadeddata = () => {
          console.log('비디오 로딩 완료');
          videoRef.current?.play()
            .then(() => console.log('비디오 재생 시작'))
            .catch(e => console.error('비디오 재생 오류:', e));
        };
        
        videoRef.current.onerror = (e) => {
          console.error('비디오 로딩 오류:', e);
        };
      }
    } catch (error) {
      console.error('비디오 처리 중 오류 발생:', error);
    }
  }, [isVideoVisible]);

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Sections 1-5: Dark Background */}
      {[
        "순간들의 기억으로 우리는 살아갑니다.",
        "청명은 그런 기억들을 청춘이라는 이름으로 꽉꽉 눌러담아 왔습니다.",
        "그런 아름다운 시간들은 흐르고 흘러",
        "벌써 1주년이 되었습니다.",
        "청명은 평생을 추억할만한 날들을 살아가는 청춘들의 이야기입니다."
      ].map((text, index) => (
        <section key={index} className="h-screen flex items-center justify-center bg-black text-white relative snap-start">
          {index === 2 ? (
            <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
              <AnimatedSection className="text-center w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1200px] mx-auto mb-4 md:mb-6 lg:mb-8 px-4">
                <p className="text-3xl md:text-5xl lg:text-7xl font-light mb-8 md:mb-10 lg:mb-12">
                  {text}
                </p>
              </AnimatedSection>
              <div className="relative w-full h-[300px] flex items-center justify-center">
                <ImageSlider images={memoryImages} />
              </div>
            </div>
          ) : (
            <AnimatedSection className="relative z-20 text-center w-full max-w-[90%] md:max-w-[80%] lg:max-w-[1200px] mx-auto px-4">
              <p className="text-3xl md:text-5xl lg:text-7xl font-light leading-relaxed tracking-wide">
                {text}
              </p>
            </AnimatedSection>
          )}
        </section>
      ))}

      {/* Background Video - Fixed position for sections 6-9 */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className={`w-full h-full transition-opacity duration-1000 ${
          isVideoVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            {isVideoVisible && (
              <video
                ref={videoRef}
                src="/background.mp4"
                muted
                autoPlay
                playsInline
                loop
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Section 6: Concert Title */}
      <section className="h-screen flex items-center justify-center relative snap-start overflow-hidden">
        <AnimatedSection className="relative z-20 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isBackgroundOpen ? 1 : 0, scale: isBackgroundOpen ? 1 : 0.8 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-9xl md:text-[14rem] font-bold mb-4">초랑</h1>
            <div className="text-[10rem] md:text-[16rem] font-bold mb-8">初浪</div>
            <p className="text-4xl md:text-6xl font-light tracking-widest">첫번째 파도</p>
          </motion.div>
        </AnimatedSection>
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
            className={`w-5 h-5 rounded-full transition-all duration-300 ${
              currentSection === i ? 'bg-blue-500 scale-125' : 'bg-gray-400 hover:bg-blue-300'
            }`}
          />
        ))}
      </div>
    </main>
  );
}

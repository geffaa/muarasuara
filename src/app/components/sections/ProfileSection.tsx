'use client'
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import CounselorCard from "../CounselorCard";

const ProfileSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Move counselors data to the top
  const counselors = [
    {
      id: 1,
      name: "Endang S., M.Psi., Psikolog",
      rating: 4.9,
      reviews: 42,
      experience: "5 Tahun",
      specialties: ["Depresi", "Kecemasan", "Pekerjaan", "+3"],
      sessions: [
        { time: "13:00", isHighlighted: true },
        { time: "15:00", isHighlighted: false },
        { time: "15:00", isHighlighted: false }
      ],
      image: "/doctor1.png",
      verified: true
    },
    {
      id: 2,
      name: "Lina M., M.Psi., Psikolog",
      rating: 4.8,
      reviews: 90,
      experience: "3 Tahun",
      specialties: ["Kecemasan", "Pekerjaan", "+2"],
      sessions: [
        { time: "13:00", isHighlighted: true },
        { time: "15:00", isHighlighted: false }
      ],
      image: "/doctor2.png",
      verified: true
    },
    {
      id: 3,
      name: "Rizal M., M.Psi., Psikolog",
      rating: 4.7,
      reviews: 40,
      experience: "2 Tahun",
      specialties: ["Depresi", "Pemulihan", "Trauma"],
      sessions: [
        { time: "13:00", isHighlighted: true },
        { time: "15:00", isHighlighted: false },
        { time: "18:00", isHighlighted: false },
        { time: "20:00", isHighlighted: false }
      ],
      image: "/doctor3.png",
      verified: true
    },
    {
      id: 4,
      name: "Dewi L, S.Psi., M.Sc., Psikolog",
      rating: 4.9,
      reviews: 540,
      experience: "5 Tahun",
      specialties: ["Pendidikan", "Konseling", "+5"],
      sessions: [
        { time: "13:00", isHighlighted: true },
        { time: "14:00", isHighlighted: false }
      ],
      image: "/doctor4.png",
      verified: true
    },
    {
      id: 5,
      name: "Dr. Maya S, M.Psi., Psikolog",
      rating: 4.7,
      reviews: 40,
      experience: "1 Tahun",
      specialties: ["Psikologi Klinis", "Terapi Kognitif-Perilaku"],
      sessions: [
        { time: "13:00", isHighlighted: true }
      ],
      image: "/doctor5.png",
      verified: true
    }
  ];

  // Handler functions after counselors declaration
  const handlePrevCounselor = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === 0 ? counselors.length - 1 : prev - 1
    );
  }, []);

  const handleNextCounselor = useCallback(() => {
    setCurrentIndex((prev) => 
      prev === counselors.length - 1 ? 0 : prev + 1
    );
  }, []);
  
  useEffect(() => {
    const section = sectionRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const content = section?.querySelector('.profile-content');
          const card = section?.querySelector('.profile-card');
          
          if (entry.isIntersecting) {
            content?.classList.add('feature-slide-up');
            setTimeout(() => {
              card?.classList.add('feature-slide-up');
            }, 200);
          } else {
            content?.classList.remove('feature-slide-up');
            card?.classList.remove('feature-slide-up');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#F2F2F2] relative overflow-hidden">
      <div className="max-w-full min-h-screen px-4 sm:px-6 md:px-12 lg:px-20 xl:px-40 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen py-10 sm:py-16 lg:py-20">
          <div className="w-full max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="profile-content opacity-0 transform translate-y-8 transition-all duration-500">
                <div className="flex flex-col h-full">
                  <div className="flex-grow">
                    <div className="mb-8">
                      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        Profil{" "}
                        <span className="text-[#C3B1E1] text-underline-animation">
                          Konselor
                        </span>{" "}
                        MuaraSuara
                      </h2>
                    </div>
                    <p className="text-base lg:text-2xl text-[#2F2F2F] font-semibold leading-relaxed text-justify">
                      Temukan lebih dari 42 konselor berpengalaman yang siap mendampingi dan membantu kamu mengatasi berbagai masalah. Dapatkan solusi terbaik dan dukungan profesional untuk menemukan jalan keluar menuju kehidupan yang lebih baik.
                    </p>
                    
                    {/* Tombol Mobile */}
                    <div className="mt-6 block lg:hidden">
                      <button 
                        className="w-full bg-[#C3B1E1] text-[#FBFBFB] px-6 py-3 rounded-full text-sm font-bold hover:bg-[#B39FD3] transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-md"
                      >
                        Lihat Semua
                      </button>
                    </div>
                  </div>

                  {/* Tombol Desktop */}
                  <div className="hidden lg:block mt-8">
                    <button 
                      className="bg-[#C3B1E1] text-[#FBFBFB] px-8 py-3.5 rounded-full text-base font-bold hover:bg-[#B39FD3] transition-all duration-300 hover:shadow-md active:scale-[0.98] shadow-sm"
                    >
                      Lihat Semua
                    </button>
                  </div>
                </div>
              </div>

              <div className="profile-card opacity-0 transform translate-y-8 transition-all duration-500">
                <CounselorCard
                  counselor={counselors[currentIndex]}
                  onPrev={handlePrevCounselor}
                  onNext={handleNextCounselor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .feature-slide-up {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

export default ProfileSection;
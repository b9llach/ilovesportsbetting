"use client";

import Image from 'next/image';
import ShinyButton from "@/components/magicui/shiny-button";
import LetterPullup from "@/components/magicui/letter-pullup";
import { FaHandshake } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const handleApplyClick = () => {
    router.push('/dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden">
      <div className="absolute top-4 left-4 z-20">
        <Image
          src="/imgs/logo.png"
          alt="StayStaked Logo"
          width={100}
          height={100}
          className="w-16 sm:w-20 md:w-24"
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full text-center px-4 space-y-8">
        <div>
          <LetterPullup 
            words="GET THE ODDS" 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
          />
          <LetterPullup 
            words="MAKE THE BET" 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
            delay={0.1}
          />
          <LetterPullup 
            words="WIN REAL MONEY." 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#433D8B]"
            delay={0.14}
          />
        </div>
        <div className="flex space-x-8">
          <ShinyButton 
            text="Explore Now!" 
            className="w-48 sm:w-56 md:w-64 text-white bg-[#433D8B] hover:bg-[#2E236C]"
            onClick={handleApplyClick}
          >
            <FaHandshake className="mr-2 inline-block" />
          </ShinyButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
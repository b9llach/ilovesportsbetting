"use client";

import Image from 'next/image';
import ShinyButton from "@/components/magicui/shiny-button";
import LetterPullup from "@/components/magicui/letter-pullup";
import DotPattern from "@/components/magicui/dot-pattern";
import { FaHandshake, FaDiscord } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const router = useRouter();

  const handleApplyClick = () => {
    router.push('/apply');
  };

  const handleJoinDiscord = () => {
    window.open("https://discord.gg/X5Tb4uUMuc", "_blank"); // Open Discord link in a new tab
  };


  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <DotPattern 
        className="absolute inset-0 h-full w-full pointer-events-none"
        width={24}
        height={24}
        cx={12}
        cy={12}
        cr={2}
        dotColor="rgba(255,110,199, .1)"
      />
      <div className="relative z-10 min-h-screen ">
        <div className="absolute top-4 left-4">
          <Image
            src="/imgs/staystakedlogo.png"
            alt="StayStaked Logo"
            width={100}
            height={100}
            className="w-16 sm:w-20 md:w-24"
          />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 space-y-8">
          <div>
            <LetterPullup 
              words="STAKE ON PLAYERS" 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
            />
            <LetterPullup 
              words="WIN REAL MONEY" 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold"
              delay={0.1}
            />
            <LetterPullup 
              words="STAY STAKED." 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#ff6ec7]"
              delay={0.2}
            />
          </div>
          <div className="flex space-x-8">
          <ShinyButton 
                text="Join our Discord Today!" 
                className="w-48 sm:w-56 md:w-64 text-black bg-[#ff6ec7] hover:bg-[#ff8ed3]"
                onClick={handleJoinDiscord}
              >
                <FaDiscord className="mr-2 inline-block" />
              </ShinyButton>
            <ShinyButton 
              text="Apply for Partner Now!" 
              className="w-48 sm:w-56 md:w-64 text-black bg-[#ff6ec7] hover:bg-[#ff8ed3]"
              onClick={handleApplyClick}
            >
              <FaHandshake className="mr-2 inline-block" />
            </ShinyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
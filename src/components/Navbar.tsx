'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaChartBar, FaArrowCircleUp, FaExchangeAlt, FaLayerGroup, FaClipboardList, FaCalculator, FaBell } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();
  
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };
  
    useEffect(() => {
      document.body.style.paddingLeft = isCollapsed ? '4rem' : '16rem';
      document.body.style.transition = 'padding-left 300ms ease-in-out';
    }, [isCollapsed]);
  
    const navItems = [
      { icon: FaChartBar, label: 'Dashboard', href: '/dashboard' },
      { icon: FaArrowCircleUp, label: 'Positive EV', href: '/positive-ev' },
      { icon: FaExchangeAlt, label: 'Arbitrage Bets', href: '/arbitrage-bets' },
      { icon: FaLayerGroup, label: 'Parlay Builder', href: '/parlay-builder' },
      { icon: FaClipboardList, label: 'Bet Tracker', href: '/bet-tracker' },
      { icon: FaCalculator, label: 'Calculators', href: '/calculators' },
      { icon: FaBell, label: 'Notices', href: '/notices' },
    ];

  // Hide navbar on the home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className={`fixed left-0 top-0 h-full bg-black text-white transition-all duration-300 ease-in-out z-40
        border-r border-gray-700 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        {/* Collapse toggle button */}
        <button
          className="absolute top-4 -right-3 bg-black border border-gray-700 rounded-full p-1 hover:bg-gray-800 transition-colors duration-200"
          onClick={toggleCollapse}
        >
          <div className="flex flex-col items-center justify-center w-5 h-5">
            <span className={`bg-white h-0.5 w-3 mb-0.5 transition-all duration-300 ${isCollapsed ? 'rotate-45 translate-y-1' : ''}`}></span>
            <span className={`bg-white h-0.5 w-3 mb-0.5 transition-all duration-300 ${isCollapsed ? 'opacity-0' : ''}`}></span>
            <span className={`bg-white h-0.5 w-3 transition-all duration-300 ${isCollapsed ? '-rotate-45 -translate-y-1' : ''}`}></span>
          </div>
        </button>

        {/* Logo */}
        <div className="p-4 mb-8 mt-12">
          <Image
            src="/imgs/logo.png"
            alt="StayStaked Logo"
            width={64}
            height={64}
            className="mx-auto"
          />
        </div>

        {/* Nav items */}
        <ul className="flex-grow">
          {navItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link href={item.href} className={`flex items-center p-3 hover:bg-[#2E236C] transition-colors duration-200 rounded-l-full
                ${pathname === item.href ? 'bg-[#433D8B]' : ''}`}>
                <item.icon size={20} className={`${isCollapsed ? 'mx-auto' : 'mr-3'}`} />
                <span className={`${isCollapsed ? 'hidden' : 'block'} text-sm`}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
"use client"

import React from 'react';
import ArbitrageBetsPanel from '@/components/ArbitrageBetsTable';

const ArbitrageBetsPage = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-black to-[#17153B] text-white min-h-screen flex items-center justify-center">
      <ArbitrageBetsPanel />
    </div>
  );
};

export default ArbitrageBetsPage;

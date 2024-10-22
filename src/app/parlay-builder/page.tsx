"use client"

import React from 'react';
import ParlayBuilder from '@/components/ParlayBuilder';

const ParlayBuilderPage = () => {
  return (
    <div className="p-8 bg-gradient-to-r from-black to-[#17153B] text-white min-h-screen flex items-center justify-center">
      <ParlayBuilder />
    </div>
  );
};

export default ParlayBuilderPage;


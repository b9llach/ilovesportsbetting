'use client'

import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex-1 transition-all duration-300 ease-in-out">
      {children}
    </main>
  );
};

export default Layout;
// First, let's create a shared container component
export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-screen p-8 bg-gradient-to-r from-black to-[#17153B] text-white">
      <div className="w-full max-w-7xl">
        {children}
      </div>
    </div>
  );
}; 
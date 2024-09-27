"use client";

import { motion, type AnimationProps } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
} as AnimationProps;

interface ShinyButtonProps {
  text: string;
  className?: string;
  onClick?: () => void; // Add onClick prop
  children?: React.ReactNode; // {{ edit_1 }} Add children prop
}

const ShinyButton = ({
  text = "shiny-button",
  className,
  onClick, // Destructure onClick
}: ShinyButtonProps) => {
  return (
    <motion.button
      {...animationProps}
      className={cn(
        "relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-[box-shadow] duration-300 ease-in-out hover:shadow bg-white hover:shadow-[0_0_20px_#ff6ec7/10%]",
        className,
      )}
      onClick={onClick} // Add onClick handler to the button
    >
      <span
        className="relative block h-full w-full text-sm uppercase tracking-wide font-semibold"
        style={{
          maskImage:
            "linear-gradient(-75deg, #ff6ec7 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #ff6ec7 calc(var(--x) + 100%))",
        }}
      >
        {text}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,#ff6ec7/10%_calc(var(--x)+20%),#ff6ec7/50%_calc(var(--x)+25%),#ff6ec7/10%_calc(var(--x)+100%))] p-px"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;

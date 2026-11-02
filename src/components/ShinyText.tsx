import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '' }) => {
  return (
    <motion.span
      className={`inline-block select-none ${className}`}
      initial={{ backgroundPosition: '200% center' }}
      animate={{ backgroundPosition: ['200% center', '-200% center'] }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration: 3,
        ease: 'linear',
      }}
      style={{
        backgroundImage:
          'linear-gradient(100deg, #64CEFB 0%, #64CEFB 35%, #ffffff 50%, #64CEFB 65%, #64CEFB 100%)',
        backgroundSize: '250% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }}
    >
      {text}
    </motion.span>
  );
};

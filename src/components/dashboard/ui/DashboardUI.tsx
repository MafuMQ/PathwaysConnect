import React from 'react';

export const Pill = ({ children, color = 'navy' }: { children: React.ReactNode, color?: 'navy' | 'green' | 'gold' | 'amber' | 'orange' }) => {
  const colors = {
    navy: 'bg-[#E5EDF6] text-[#1A3A5C]',
    green: 'bg-[#E7F2EA] text-[#1E6B3C]',
    gold: 'bg-[#F6EFD9] text-[#A8862F]',
    amber: 'bg-[#FBEEDB] text-[#B7791F]',
    orange: 'bg-[#F7E7D8] text-[#C4651A]'
  };
  return <span className={`inline-block font-bold text-[10.5px] py-1 px-2.5 rounded-full tracking-wide ${colors[color]}`}>{children}</span>;
};

export const Btn = ({ children, color = 'navy', size = 'md', block = false, onClick, className = '' }: {
  children: React.ReactNode, color?: 'navy' | 'green' | 'gold' | 'ghost' | 'orange', size?: 'sm' | 'md', block?: boolean, onClick?: () => void, className?: string
}) => {
  const colors = {
    navy: 'bg-[#1A3A5C] text-white',
    green: 'bg-[#1E6B3C] text-white',
    gold: 'bg-gradient-to-br from-[#D9BC6B] to-[#C9A84C] text-[#10263D]',
    ghost: 'bg-white border-[1.5px] border-[#E4E0D4] text-[#1A3A5C]',
    orange: 'bg-gradient-to-br from-[#D97A2B] to-[#C4651A] text-white'
  };
  const sizes = { sm: 'py-2 px-3 text-xs rounded-[10px]', md: 'py-3 px-4 text-[13px] rounded-xl' };
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-1.5 font-bold tracking-wide transition-transform active:scale-95 ${colors[color]} ${sizes[size]} ${block ? 'w-full' : ''} ${className}`}>
      {children}
    </button>
  );
};

export const Card = ({ children, className = '', onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div onClick={onClick} className={`bg-white border border-[#E4E0D4] rounded-2xl p-4 shadow-sm mb-3 ${className}`}>
    {children}
  </div>
);

export const Eyebrow = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`font-bold text-[10px] tracking-[2.2px] text-[#A8862F] uppercase mb-1 ${className}`}>
    {children}
  </div>
);

export const Title = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`font-['Playfair_Display'] font-bold text-[19px] text-[#1A3A5C] mb-0.5 ${className}`}>
    {children}
  </h2>
);

export const Sub = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-[13px] text-[#6B7688] leading-snug ${className}`}>
    {children}
  </p>
);

import React from 'react';
type Props = {
  children: React.ReactNode;
};

export default function SectionTitle({ children }: Props) {
  return (
    <h2 className="text-lg text-black dark:text-white font-semibold mb-3">
      {children}
    </h2>
  );
}

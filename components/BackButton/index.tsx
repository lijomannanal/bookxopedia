'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft as BackIcon } from 'lucide-react';
import { useContext, useEffect } from 'react';
import SearchContext from '@/app/(main)/Context/SearchContext';

export default function BackButton() {
  const { setShowResults: setShowSearchResults } = useContext(SearchContext);
  const router = useRouter();

  useEffect(() => {
    setShowSearchResults(false);
  }, [setShowSearchResults]);

  const goBack = () => {
    router.back();
  };
  return (
    <button
      title="Go Back"
      onClick={goBack}
      className="bg-transaparent text-gray-400"
    >
      <BackIcon size={24} />
    </button>
  );
}

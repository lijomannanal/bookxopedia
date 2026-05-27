'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft as BackIcon } from 'lucide-react';
import { useContext, useEffect } from 'react';
import SearchContext from '@/app/(main)/Context/SearchContext';
import { Button } from '../ui/button';

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
    <Button
      variant={'outline'}
      title="Go Back"
      onClick={goBack}
      className="bg-transaparent"
    >
      <BackIcon size={24} />
      Back
    </Button>
  );
}

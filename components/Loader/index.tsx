import { BookOpen, Loader as LoaderIcon } from 'lucide-react';
type Props = {
  caption?: string;
};

export default function Loader({ caption = 'Loading...' }: Props) {
  return (
    <div
      className={`w-full p-6 flex flex-col items-center gap-4`}
      role="status"
      aria-live="polite"
    >
      {/* Book Icon with subtle pulse */}
      <div className="flex items-center justify-center rounded-full p-5 bg-slate-100 shadow-inner">
        <BookOpen className="h-10 w-10 text-indigo-600 animate-pulse" />
      </div>

      {/* Loading text */}
      <div className="flex items-center text-black dark:text-white gap-2 font-medium">
        <LoaderIcon className="h-5 w-5 animate-spin" aria-hidden />
        {caption}
      </div>

      <span className="sr-only">{caption}</span>
    </div>
  );
}

import { SearchX } from 'lucide-react';

type Props = {
  caption?: string;
};

export default function NoResultFound({ caption }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <div className="relative w-40 h-40 opacity-80">
        <SearchX className="w-40 h-40 text-gray-300" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">No result found</h2>
      <p className="text-gray-500 max-w-sm">
        {caption ||
          'We could not find any results for your search. Please try different keywords.'}
      </p>
    </div>
  );
}

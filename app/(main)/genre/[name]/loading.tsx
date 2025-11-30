import Loader from '@/components/Loader';

export default function Loading() {
  return (
    <div className="w-full flex justify-center h-full">
      <Loader caption="Loading Books..." />
    </div>
  );
}

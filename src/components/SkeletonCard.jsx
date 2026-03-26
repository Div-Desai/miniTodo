export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-100 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-100 rounded w-1/2"></div>
    </div>
  );
}

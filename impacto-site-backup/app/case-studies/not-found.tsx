import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Case Study Not Found</h1>
      <p className="text-lg mb-10">
        Sorry, we couldn't find the case study you're looking for. It may have been moved or doesn't exist.
      </p>
      <Link 
        href="/case-studies" 
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
      >
        Browse All Case Studies
      </Link>
    </div>
  );
} 
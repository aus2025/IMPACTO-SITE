import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
          Welcome to Impacto
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          Your business automation experts. We help businesses transform their operations with AI and automation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/services"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Our Services
          </Link>
          <Link
            href="/contact"
            className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-6 py-3 rounded-md font-medium transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
} 
import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl">Page Not Found</h2>
      <p className="mt-4 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      <Link href="/" className="px-4 py-2 mt-8 text-white bg-blue-600 rounded hover:bg-blue-700">
        Return Home
      </Link>
    </div>
  )
} 
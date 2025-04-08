import TestConnection from '../test-connection';
import BlogDiagnosticNav from '../diagnostic-nav';

export default function TestPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <BlogDiagnosticNav />
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Database Connection Test
      </h1>
      
      <TestConnection />
    </div>
  );
} 
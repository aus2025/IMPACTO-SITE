import { Metadata } from 'next';
import BusinessAssessmentForm from './components/BusinessAssessmentForm';

export const metadata: Metadata = {
  title: 'Business Assessment | Impacto Automation Solutions',
  description: 'Take our comprehensive business assessment to receive a personalized automation blueprint for your organization.',
};

export default function AssessmentPage() {
  return (
    <div className="min-h-screen">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-blue-300 to-purple-300 py-4 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-lg font-medium">
            Complete the Assessment to Receive the Blueprint!
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Business Automation Assessment
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Complete this assessment to receive your personalized automation blueprint and unlock a 20% discount on our services.
          </p>
        </div>
        
        <BusinessAssessmentForm />
        
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Your Privacy Matters
            </h2>
            <p className="text-gray-700">
              We're committed to protecting your information. Your responses will only be used to create your personalized automation blueprint and to improve our services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
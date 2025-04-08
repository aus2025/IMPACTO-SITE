import BusinessAssessmentForm from '../assessment/components/BusinessAssessmentForm';

export default function BlueprintAssessmentPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full" style={{ backgroundColor: 'rgba(65, 105, 225, 0.6)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Business Blueprint Assessment
            </h1>
            <p className="text-xl mb-8">
              Your first step to transformation. Complete this assessment to receive a customized automation roadmap and claim your 20% discount.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-8 rounded-xl shadow-md max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md mb-4 font-medium">
                Exclusive 20% OFF Promotion
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Start Your Business Transformation Journey
              </h2>
              <p className="text-gray-700 mt-2">
                Complete the assessment below to receive your personalized automation blueprint and claim your 20% discount.
              </p>
            </div>
            
            <BusinessAssessmentForm />
          </div>
        </div>
      </section>
    </main>
  );
} 
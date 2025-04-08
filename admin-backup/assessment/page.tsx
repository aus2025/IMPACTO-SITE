import BusinessAssessmentForm from './components/BusinessAssessmentForm';

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Business Automation Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete this comprehensive assessment to help us understand your business needs and automation goals. 
            Our experts will analyze your responses and provide a customized automation strategy to transform your operations.
          </p>
        </div>
        
        <BusinessAssessmentForm />
        
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">
            Why Complete This Assessment?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl font-bold mb-2">01</div>
              <h3 className="font-medium text-gray-800 mb-2">Tailored Solutions</h3>
              <p className="text-gray-600 text-sm">
                Receive recommendations specifically designed for your business challenges and goals.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl font-bold mb-2">02</div>
              <h3 className="font-medium text-gray-800 mb-2">Expert Analysis</h3>
              <p className="text-gray-600 text-sm">
                Our automation specialists will analyze your needs and identify the highest-impact opportunities.
              </p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <div className="text-blue-600 text-xl font-bold mb-2">03</div>
              <h3 className="font-medium text-gray-800 mb-2">Clear Roadmap</h3>
              <p className="text-gray-600 text-sm">
                Get a strategic implementation plan with timeline, budget considerations, and expected outcomes.
              </p>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-12">
            Your information is secure and will only be used to provide you with relevant automation insights and recommendations.
            View our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a> for more details.
          </p>
        </div>
      </div>
    </main>
  );
} 
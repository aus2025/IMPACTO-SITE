import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Impacto Automation AI',
  description: 'Learn about our mission to make artificial intelligence and automation accessible, practical, and powerful for everyone.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* Hero section */}
      <section className="py-24 bg-blue-700 text-white w-full">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Impacto
            </h1>
            <p className="text-xl mb-8">
              Learn about our mission to make AI accessible and powerful for everyone
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Impacto Automation AI was founded with a single mission: to make artificial intelligence and automation accessible, practical, and powerful for everyone—especially beginners and small to medium-sized businesses. We believe that AI isn't just for tech giants or experts – it's a tool that anyone can use to solve real problems, improve efficiency, and innovate. Our mission is to break down barriers so that <strong>you</strong> can harness the power of AI in your everyday work and projects.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              Impacto Automation AI began in 2022 with a simple idea and a lot of passion. Rafael Ananias, our founder, has been in love with computing since the days of MS-DOS. When he started exploring the world of AI in 2022, he realized something important: most people never had the chance to access or learn about this powerful technology. Rafael taught himself AI from the ground up and brought together a team of like-minded AI enthusiasts.
            </p>
            <p>
              Together, they set out to turn that knowledge into practical tools and guidance for everyone. What started as one person's dream is now a growing team on a mission to make AI approachable and beneficial to all.
            </p>
          </div>
        </section>
        
        {/* Why We Exist */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Why We Exist</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              We founded Impacto Automation AI because we saw a gap. So many small and medium-sized businesses want to leverage AI but feel it's too complicated, too expensive, or just out of reach. We're here to change that.
            </p>
            <p>
              By simplifying complex concepts and focusing on practical solutions, we help demystify AI for everyday people. In short, we exist to empower those who thought AI was "not for me" to finally say, "I <em>can</em> do this with AI."
            </p>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Values</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Innovation</h3>
                <p className="text-gray-700">We constantly explore new ways to use AI and automation to make life easier and businesses more efficient.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Accessibility</h3>
                <p className="text-gray-700">Technology should be for everyone. We design our tools and services so that even beginners feel welcome and supported.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Practicality</h3>
                <p className="text-gray-700">We focus on real-world solutions that you can put to use today. No hype, just tools and results that work in daily operations.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Ethical AI</h3>
                <p className="text-gray-700">We believe in using AI responsibly and transparently. Our solutions are designed to empower people while respecting privacy and human dignity.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Real-World Results</h3>
                <p className="text-gray-700">We measure success by the tangible improvements we create for our clients. If it doesn't help you in the real world, we won't recommend it.</p>
              </div>
            </li>
          </ul>
        </section>
        
        {/* Meet the Founder */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Meet the Founder</h2>
          <div className="bg-blue-50 p-8 rounded-xl">
            <div className="prose prose-lg max-w-none">
              <p>
                Hi, I'm Rafael Ananias – Founder and CEO of Impacto Automation AI.
                My journey with technology started early, back when I was a curious kid experimenting with commands on a DOS computer. That spark never left. In 2022, when I began exploring the world of Artificial Intelligence, one thing became clear: AI shouldn't be exclusive to tech experts or big corporations.
              </p>
              <p>
                I launched Impacto Automation AI with a simple mission — to make the power of AI accessible to everyone. Whether you're a small business owner, educator, or creative professional, you deserve tools that work for you — not against you.
              </p>
              <p>
                Today, I lead a passionate team committed to helping people harness ethical, practical AI solutions that simplify workflows, spark innovation, and create real impact.
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gray-100 p-8 rounded-xl text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your AI Journey?</h3>
          <p className="text-lg mb-6">
            We're excited to help you explore how AI can create real results for you. Whether you're just curious or ready to dive in, we're here to guide you every step of the way. <strong>Let's talk about your goals and ideas.</strong>
          </p>
          <a
            href="https://calendly.com/rba-aus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Schedule a free one-on-one consultation with Rafael
          </a>
        </section>
      </div>
    </main>
  );
} 
-- Insert test data into all tables

-- Sample data for services
INSERT INTO services (title, slug, description, icon, content)
VALUES 
  ('Social Media Marketing', 'social-media-marketing', 'Boost your social media presence with AI-powered solutions', 'social-media-icon', '<h2>AI-Powered Social Media Marketing</h2><p>Our social media marketing services leverage artificial intelligence to optimize your online presence, engage your audience, and drive measurable results.</p><h3>Key Features</h3><ul><li>Content generation and scheduling</li><li>Audience analytics and targeting</li><li>Performance tracking and optimization</li><li>Competitor analysis</li></ul>'),
  
  ('Workflow Automation', 'workflow-automation', 'Streamline your business processes with intelligent automation', 'automation-icon', '<h2>Intelligent Workflow Automation</h2><p>Our workflow automation solutions help businesses eliminate repetitive tasks, reduce errors, and improve efficiency across departments.</p><h3>Key Benefits</h3><ul><li>Reduced operational costs</li><li>Improved accuracy and consistency</li><li>Enhanced employee productivity</li><li>Scalable solutions</li></ul>'),
  
  ('Data Analytics', 'data-analytics', 'Transform your data into actionable insights with AI', 'analytics-icon', '<h2>AI-Powered Data Analytics</h2><p>Our data analytics services help you uncover hidden patterns, predict trends, and make data-driven decisions that drive growth.</p><h3>Our Approach</h3><ul><li>Data collection and cleansing</li><li>Advanced analytics and visualization</li><li>Predictive modeling</li><li>Strategic recommendations</li></ul>'),
  
  ('Customer Service Automation', 'customer-service-automation', 'Enhance customer experience with AI-powered service solutions', 'customer-service-icon', '<h2>Customer Service Automation</h2><p>Our customer service automation solutions help businesses deliver exceptional service experiences while reducing support costs.</p><h3>Solutions</h3><ul><li>AI chatbots and virtual assistants</li><li>Ticket routing and prioritization</li><li>Knowledge base optimization</li><li>Customer feedback analysis</li></ul>');

-- Sample data for blog posts
INSERT INTO blog_posts (title, slug, content, featured_image, published_at, is_published, author, tags, meta_description)
VALUES 
  ('How AI is Transforming Business Automation in 2025', 'ai-transforming-business-automation-2025', '<h2>The Evolution of AI in Business</h2><p>Artificial intelligence has come a long way in recent years, and its impact on business automation is undeniable. In this article, we explore how AI is transforming business operations in 2025.</p><h3>Key Trends</h3><ul><li>Natural language processing for customer interactions</li><li>Predictive analytics for process optimization</li><li>Autonomous decision-making systems</li><li>Intelligent document processing</li></ul>', '/images/blog/ai-automation.jpg', '2025-02-15T10:00:00Z', TRUE, 'Sarah Johnson', ARRAY['AI', 'Automation', 'Business'], 'Discover how artificial intelligence is revolutionizing business automation in 2025 and beyond.'),
  
  ('5 Ways to Leverage Social Media for Business Growth', 'leverage-social-media-business-growth', '<h2>Harnessing Social Media Power</h2><p>Social media continues to be a powerful tool for business growth. In this post, we share five proven strategies to leverage social platforms for your business.</p><h3>Effective Strategies</h3><ol><li>Content personalization</li><li>Community building</li><li>Influencer partnerships</li><li>Social listening and engagement</li><li>Integrated marketing campaigns</li></ol>', '/images/blog/social-media.jpg', '2025-02-01T14:30:00Z', TRUE, 'Michael Zhang', ARRAY['Social Media', 'Marketing', 'Growth'], 'Learn five effective strategies to leverage social media platforms for substantial business growth.'),
  
  ('The Future of Work: AI and Human Collaboration', 'future-work-ai-human-collaboration', '<h2>A New Era of Collaboration</h2><p>The future of work isn''t about AI replacing humans—it''s about powerful collaboration between people and machines. This article explores this synergistic relationship.</p><h3>Key Aspects</h3><ul><li>Augmented intelligence in the workplace</li><li>Changing job roles and skills</li><li>Ethical considerations</li><li>Preparing for the future</li></ul>', '/images/blog/ai-collaboration.jpg', '2025-01-20T09:15:00Z', TRUE, 'Emma Rodriguez', ARRAY['AI', 'Future of Work', 'Collaboration'], 'Explore how AI and human collaboration is reshaping the future of work across industries.'),
  
  ('Unpublished Draft: Customer Service Trends for 2025', 'customer-service-trends-2025', '<h2>Draft Content</h2><p>This is a draft article about customer service trends for 2025. It will cover AI chatbots, omnichannel support, predictive service, and emotional intelligence in customer interactions.</p>', '/images/blog/customer-service.jpg', NULL, FALSE, 'David Lee', ARRAY['Customer Service', 'Trends', 'Draft'], 'A look at emerging customer service trends that will dominate in 2025.');

-- Sample data for case studies
INSERT INTO case_studies (title, client, challenge, solution, results, featured_image, slug)
VALUES 
  ('Streamlining Operations for Global Manufacturing Company', 'TechManufacture Inc.', 'TechManufacture was struggling with inefficient workflows, data silos, and manual processes that were causing delays and errors in their production cycle.', 'We implemented a comprehensive workflow automation solution that integrated their disparate systems, automated repetitive tasks, and provided real-time analytics for decision-making.', 'The implementation resulted in a 35% reduction in processing time, 42% fewer errors, and an estimated annual savings of $1.2 million.', '/images/case-studies/manufacturing.jpg', 'techmanufacture-workflow-automation'),
  
  ('Enhancing Customer Engagement for Retail Chain', 'ShopSmart Retail', 'ShopSmart was facing declining customer engagement and loyalty in a competitive retail market, with limited insights into customer preferences and behaviors.', 'We deployed an AI-powered social media and customer analytics platform that provided personalized marketing, improved customer segmentation, and automated engagement campaigns.', 'Within 6 months, ShopSmart saw a 28% increase in social media engagement, 15% higher conversion rates, and a 22% improvement in customer retention.', '/images/case-studies/retail.jpg', 'shopsmart-customer-engagement'),
  
  ('Transforming Data Management for Financial Services Firm', 'Secure Financial Partners', 'Secure Financial was overwhelmed with unstructured data and manual reporting processes, leading to delays in decision-making and regulatory compliance challenges.', 'We implemented a data analytics and automation solution that streamlined data collection, cleansing, and analysis, with automated reporting and compliance monitoring.', 'The solution reduced reporting time from days to hours, improved data accuracy by 95%, and enabled the firm to identify $3M in new revenue opportunities through data insights.', '/images/case-studies/financial.jpg', 'securefinancial-data-transformation');

-- Sample data for leads
INSERT INTO leads (name, email, phone, service_interest, message)
VALUES 
  ('John Smith', 'john.smith@example.com', '555-123-4567', 'Workflow Automation', 'I''m interested in learning more about how your workflow automation solutions can help my logistics company reduce operational costs.'),
  
  ('Maria Garcia', 'maria.garcia@example.com', '555-987-6543', 'Social Media Marketing', 'Our company is looking to improve our social media presence. Can you share some case studies for businesses in the retail sector?'),
  
  ('Robert Johnson', 'robert.j@example.com', '555-456-7890', 'Data Analytics', 'We need help making sense of our customer data. Interested in your data analytics services for a medium-sized healthcare provider.'),
  
  ('Jennifer Kim', 'jennifer.kim@example.com', '555-789-1234', 'Customer Service Automation', 'Looking for information on chatbot solutions for our customer service department. We receive about 1,000 inquiries daily.');

-- Sample data for business assessments
INSERT INTO business_assessments (
  company_name, 
  contact_name, 
  contact_email, 
  contact_phone, 
  company_size, 
  industry, 
  current_challenges, 
  automation_interest, 
  current_tools, 
  budget_range, 
  timeline, 
  goals, 
  additional_info
)
VALUES 
  (
    'Evergreen Solutions', 
    'Michael Brown', 
    'michael.brown@evergreensolutions.com', 
    '555-222-3333', 
    '50-100 employees', 
    'Healthcare Technology', 
    ARRAY['Manual data entry', 'Communication gaps', 'Reporting inefficiencies'], 
    ARRAY['Workflow automation', 'Data analytics', 'Document processing'], 
    ARRAY['Microsoft Office', 'Trello', 'QuickBooks'], 
    '$25,000 - $50,000', 
    '3-6 months', 
    'We want to reduce administrative overhead by 30% and improve data accuracy across our patient management systems.', 
    'We are particularly interested in HIPAA-compliant solutions.'
  ),
  
  (
    'Alpine Retailers', 
    'Sarah Williams', 
    'sarah.w@alpineretailers.com', 
    '555-444-5555', 
    '100-250 employees', 
    'Retail', 
    ARRAY['Customer engagement', 'Inventory management', 'Staff scheduling'], 
    ARRAY['Customer service automation', 'Social media marketing', 'Predictive analytics'], 
    ARRAY['Shopify', 'HubSpot', 'ADP'], 
    '$50,000 - $100,000', 
    '6-12 months', 
    'Looking to create a more personalized customer experience and optimize our inventory management to reduce waste by 25%.', 
    'We have multiple locations across the Northeast region.'
  ),
  
  (
    'Quantum Logistics', 
    'David Chen', 
    'david.chen@quantumlogistics.com', 
    '555-666-7777', 
    '250-500 employees', 
    'Transportation and Logistics', 
    ARRAY['Route optimization', 'Delivery tracking', 'Fuel management'], 
    ARRAY['Workflow automation', 'IoT integration', 'Predictive maintenance'], 
    ARRAY['SAP', 'Salesforce', 'Custom ERP'], 
    '$100,000+', 
    '6-9 months', 
    'We need to optimize our delivery routes, reduce fuel consumption by 15%, and improve real-time tracking for customers.', 
    'We operate a fleet of 120 vehicles and serve 12 states.'
  ); 
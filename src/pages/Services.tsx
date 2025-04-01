
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";

// Import icons
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Image, 
  Video, 
  Mail, 
  BarChart, 
  PieChart,
  Zap
} from "lucide-react";

const Services = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <BlogLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-blog-dark to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Our <span className="text-blog-green">Services</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Comprehensive social media solutions designed to elevate your brand and drive measurable results.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Social Media Management */}
      <section id="management" ref={addToRefs} className="py-20 bg-blog-dark opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blog-green/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/social-management.webp" 
                  alt="Social Media Management" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blog-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Social Media Management</h2>
              <p className="text-lg text-gray-300 mb-6">
                Let us handle the day-to-day management of your social media accounts so you can focus on running your business. Our team of experts will create, schedule, and optimize content that resonates with your audience.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Content Creation & Curation</h3>
                    <p className="text-gray-400">
                      Eye-catching visuals and compelling copy that reflect your brand voice and engage your audience.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Community Management</h3>
                    <p className="text-gray-400">
                      Active monitoring and engagement with your followers, building relationships and addressing inquiries.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Content Calendar</h3>
                    <p className="text-gray-400">
                      Strategic planning and scheduling of content to ensure consistent posting and optimal engagement.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Strategy */}
      <section id="growth" ref={addToRefs} className="py-20 bg-secondary opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-700/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/growth-strategy.webp" 
                  alt="Growth Strategy" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-blog-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Growth Strategy</h2>
              <p className="text-lg text-gray-300 mb-6">
                A tailored approach to growing your social media presence, increasing followers, boosting engagement, and driving meaningful conversions.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Audience Analysis</h3>
                    <p className="text-gray-400">
                      Deep understanding of your target audience's preferences, behaviors, and pain points.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Competitive Analysis</h3>
                    <p className="text-gray-400">
                      Insights into what's working for your competitors and how to differentiate your brand.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Platform Strategy</h3>
                    <p className="text-gray-400">
                      Focus on the platforms that matter most to your audience and business goals.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Paid Advertising */}
      <section id="advertising" ref={addToRefs} className="py-20 bg-blog-dark opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-700/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/paid-advertising.webp" 
                  alt="Paid Advertising" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-blog-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Paid Advertising</h2>
              <p className="text-lg text-gray-300 mb-6">
                Strategic ad campaigns that put your brand in front of the right audience at the right time, maximizing your return on investment.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Campaign Development</h3>
                    <p className="text-gray-400">
                      Creating ads that grab attention and drive action, from awareness to conversion.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Audience Targeting</h3>
                    <p className="text-gray-400">
                      Precision targeting to reach the audiences most likely to convert, based on demographics, interests, and behaviors.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Performance Tracking</h3>
                    <p className="text-gray-400">
                      Continuous monitoring and optimization to improve results and reduce cost per acquisition.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Influencer Marketing */}
      <section id="influencer" ref={addToRefs} className="py-20 bg-secondary opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blog-green/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/influencer-marketing.webp" 
                  alt="Influencer Marketing" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-blog-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Influencer Marketing</h2>
              <p className="text-lg text-gray-300 mb-6">
                Harness the power of trusted voices in your industry to amplify your brand message and connect with new audiences.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Influencer Identification</h3>
                    <p className="text-gray-400">
                      Finding the right influencers whose audience and values align with your brand.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Campaign Management</h3>
                    <p className="text-gray-400">
                      End-to-end management of influencer relationships, content creation, and campaign execution.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Results Tracking</h3>
                    <p className="text-gray-400">
                      Measuring the impact of influencer campaigns on brand awareness, engagement, and conversions.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content Creation */}
      <section id="content" ref={addToRefs} className="py-20 bg-blog-dark opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blog-green/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/content-creation.webp" 
                  alt="Content Creation" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6">
                <Image className="w-7 h-7 text-blog-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Content Creation</h2>
              <p className="text-lg text-gray-300 mb-6">
                High-quality, engaging content that captures attention, builds brand identity, and drives engagement across all platforms.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Visual Content</h3>
                    <p className="text-gray-400">
                      Professional graphics, photography, and short-form videos tailored to each platform.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Copywriting</h3>
                    <p className="text-gray-400">
                      Compelling captions, headlines, and copy that resonate with your audience and drive action.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Video Production</h3>
                    <p className="text-gray-400">
                      From concept to execution, creating videos that tell your brand story effectively.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Listening */}
      <section id="listening" ref={addToRefs} className="py-20 bg-secondary opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-700/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/social-listening.webp" 
                  alt="Social Listening" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-blog-green" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Social Listening</h2>
              <p className="text-lg text-gray-300 mb-6">
                Gain valuable insights by monitoring and analyzing conversations about your brand, industry, and competitors across social media.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Brand Monitoring</h3>
                    <p className="text-gray-400">
                      Track mentions of your brand and respond to customer feedback in real-time.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Competitor Analysis</h3>
                    <p className="text-gray-400">
                      Understand what people are saying about your competitors and identify opportunities.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Sentiment Analysis</h3>
                    <p className="text-gray-400">
                      Gauge public perception of your brand and track changes over time.
                    </p>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center px-6 py-3 bg-blog-green text-white rounded-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Get Started
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={addToRefs} className="py-20 bg-blog-dark opacity-0">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blog-green/20 to-purple-800/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
            </div>
            
            <div className="flex flex-col lg:flex-row items-center justify-between relative z-10">
              <div className="lg:w-2/3 mb-8 lg:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Social Media Strategy?</h2>
                <p className="text-xl text-gray-300">
                  Contact us today to discuss your specific needs and how we can help your business grow.
                </p>
              </div>
              <div>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-blog-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-blog-green/20"
                >
                  Get In Touch
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTop />
    </BlogLayout>
  );
};

export default Services;

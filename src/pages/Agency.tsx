
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import ScrollToTop from "@/components/ScrollToTop";
import { motion } from "framer-motion";

// Import icons
import { Zap, Target, TrendingUp, Users, Award, MessageSquare } from "lucide-react";

const Agency = () => {
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
      <section className="py-20 md:py-32 bg-gradient-to-b from-blog-dark to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Transform Your <span className="text-blog-green">Social Media</span> Presence
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We help businesses grow their audience, increase engagement, and drive conversions through strategic social media marketing.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link 
                  to="/contact" 
                  className="px-8 py-3 bg-blog-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-blog-green/20"
                >
                  Get Started
                </Link>
                <Link 
                  to="/services" 
                  className="px-8 py-3 bg-transparent text-white font-semibold rounded-lg border border-white/20 hover:bg-white/5 transition-all"
                >
                  Our Services
                </Link>
              </motion.div>
            </div>
            <div className="w-full md:w-1/2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-blog-green/20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-purple-700/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/hero-image.webp" 
                  alt="Social Media Dashboard" 
                  className="relative rounded-xl shadow-2xl border border-white/10"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={addToRefs} className="py-20 bg-blog-dark opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Comprehensive social media solutions designed to elevate your brand and drive measurable results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10 hover:border-blog-green/50 transition-all hover:shadow-lg hover:shadow-blog-green/5 group">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blog-green/30 transition-all">
                <Zap className="w-7 h-7 text-blog-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Social Media Management</h3>
              <p className="text-gray-400 mb-6">
                We handle everything from content creation to community engagement, ensuring your social presence remains active and engaging.
              </p>
              <Link to="/services#management" className="text-blog-green font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Service Card 2 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10 hover:border-blog-green/50 transition-all hover:shadow-lg hover:shadow-blog-green/5 group">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blog-green/30 transition-all">
                <TrendingUp className="w-7 h-7 text-blog-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Growth Strategy</h3>
              <p className="text-gray-400 mb-6">
                Data-driven strategies to increase your followers, engagement, and conversions across all social platforms.
              </p>
              <Link to="/services#growth" className="text-blog-green font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Service Card 3 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10 hover:border-blog-green/50 transition-all hover:shadow-lg hover:shadow-blog-green/5 group">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blog-green/30 transition-all">
                <Target className="w-7 h-7 text-blog-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Paid Advertising</h3>
              <p className="text-gray-400 mb-6">
                Targeted ad campaigns designed to reach your ideal audience and maximize your return on investment.
              </p>
              <Link to="/services#advertising" className="text-blog-green font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Service Card 4 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10 hover:border-blog-green/50 transition-all hover:shadow-lg hover:shadow-blog-green/5 group">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blog-green/30 transition-all">
                <Users className="w-7 h-7 text-blog-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Influencer Marketing</h3>
              <p className="text-gray-400 mb-6">
                Connect with the right influencers to amplify your brand message and reach new audiences authentically.
              </p>
              <Link to="/services#influencer" className="text-blog-green font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Service Card 5 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10 hover:border-blog-green/50 transition-all hover:shadow-lg hover:shadow-blog-green/5 group">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blog-green/30 transition-all">
                <Award className="w-7 h-7 text-blog-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Content Creation</h3>
              <p className="text-gray-400 mb-6">
                Eye-catching visuals and compelling copy that resonates with your audience and aligns with your brand voice.
              </p>
              <Link to="/services#content" className="text-blog-green font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            {/* Service Card 6 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10 hover:border-blog-green/50 transition-all hover:shadow-lg hover:shadow-blog-green/5 group">
              <div className="w-14 h-14 bg-blog-green/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blog-green/30 transition-all">
                <MessageSquare className="w-7 h-7 text-blog-green" />
              </div>
              <h3 className="text-xl font-bold mb-3">Social Listening</h3>
              <p className="text-gray-400 mb-6">
                Monitor conversations about your brand and industry to gain insights and respond to opportunities in real-time.
              </p>
              <Link to="/services#listening" className="text-blog-green font-semibold inline-flex items-center">
                Learn More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={addToRefs} className="py-20 bg-secondary opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Agency?</h2>
              <p className="text-lg text-gray-300 mb-8">
                We're not just another social media agency. Our team of experts combines creativity with data-driven strategies to deliver exceptional results.
              </p>
              
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                    <p className="text-gray-400">
                      We've helped businesses of all sizes achieve remarkable growth on social media, with measurable ROI.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Tailored Strategies</h3>
                    <p className="text-gray-400">
                      No one-size-fits-all approaches. We create custom strategies that align with your unique business goals.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-blog-green rounded-full"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Dedicated Team</h3>
                    <p className="text-gray-400">
                      Your account will be managed by a team of specialists committed to your success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-700/20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blog-green/20 rounded-full filter blur-3xl"></div>
                <img 
                  src="/images/team-working.webp" 
                  alt="Our team at work" 
                  className="relative rounded-xl shadow-2xl border border-white/10 w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={addToRefs} className="py-20 bg-blog-dark opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Don't take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10">
              <div className="flex items-center mb-6">
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-300 mb-6 italic">
                "Working with this team has been a game-changer for our brand. Our social media engagement has increased by 300% and we're seeing real business results."
              </p>
              <div className="flex items-center">
                <img 
                  src="/images/testimonial-1.webp" 
                  alt="Sarah Johnson" 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blog-green"
                />
                <div>
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-gray-400">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10">
              <div className="flex items-center mb-6">
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-300 mb-6 italic">
                "The team's creativity and strategic approach helped us stand out in a crowded market. Our social following has doubled in just six months."
              </p>
              <div className="flex items-center">
                <img 
                  src="/images/testimonial-2.webp" 
                  alt="Michael Roberts" 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blog-green"
                />
                <div>
                  <h4 className="font-semibold">Michael Roberts</h4>
                  <p className="text-sm text-gray-400">CEO, Boutique Fashion</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-secondary p-8 rounded-xl border border-white/10">
              <div className="flex items-center mb-6">
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg className="text-yellow-400 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </div>
              <p className="text-gray-300 mb-6 italic">
                "I was skeptical about investing in social media marketing, but the ROI has been incredible. The team is responsive, creative, and truly understands our industry."
              </p>
              <div className="flex items-center">
                <img 
                  src="/images/testimonial-3.webp" 
                  alt="Jennifer Lee" 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blog-green"
                />
                <div>
                  <h4 className="font-semibold">Jennifer Lee</h4>
                  <p className="text-sm text-gray-400">Founder, Wellness Hub</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/case-studies" 
              className="inline-flex items-center px-6 py-3 bg-secondary text-white rounded-lg hover:bg-white/5 transition-all border border-white/10"
            >
              View Our Case Studies
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Clients Section */}
      <section ref={addToRefs} className="py-20 bg-secondary opacity-0">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Leading Brands</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We're proud to work with businesses of all sizes across various industries.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Client logos (grayscale) */}
            <div className="flex items-center justify-center">
              <img src="/images/client-1.svg" alt="Client" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/images/client-2.svg" alt="Client" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/images/client-3.svg" alt="Client" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/images/client-4.svg" alt="Client" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/images/client-5.svg" alt="Client" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-center">
              <img src="/images/client-6.svg" alt="Client" className="h-12 opacity-50 hover:opacity-100 transition-opacity" />
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
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Social Media Presence?</h2>
                <p className="text-xl text-gray-300">
                  Let's discuss how we can help your business grow with strategic social media marketing.
                </p>
              </div>
              <div>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center px-8 py-4 bg-blog-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-blog-green/20"
                >
                  Schedule a Free Consultation
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section ref={addToRefs} className="py-20 bg-secondary opacity-0">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Insights</h2>
              <p className="text-xl text-gray-400 max-w-3xl">
                Stay updated with the latest trends and strategies in social media marketing.
              </p>
            </div>
            <Link to="/blog" className="text-blog-green font-semibold inline-flex items-center">
              View All
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog cards will be dynamically loaded from the blog system */}
            {/* We'll implement this connection in the next step */}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </BlogLayout>
  );
};

export default Agency;

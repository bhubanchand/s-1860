
import React from "react";
import BlogLayout from "@/components/BlogLayout";

const TermsOfService = () => {
  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <div className="bg-secondary rounded-lg p-8 animate-fade-up">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-muted-foreground mb-6">
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to BlogPulse. These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use BlogPulse if you do not accept all of the terms and conditions stated on this page.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">2. License to Use Website</h2>
              <p>
                Unless otherwise stated, BlogPulse and/or its licensors own the intellectual property rights for all material on BlogPulse. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Republish material from this website</li>
                <li>Sell, rent or sub-license material from this website</li>
                <li>Reproduce, duplicate or copy material from this website</li>
                <li>Redistribute content from BlogPulse (unless content is specifically made for redistribution)</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4">3. User Content</h2>
              <p>
                In these terms and conditions, "User Content" means material (including without limitation text, images, audio material, video material and audio-visual material) that you submit to this website, for whatever purpose.
              </p>
              <p>
                You grant to BlogPulse a worldwide, irrevocable, non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate and distribute your User Content in any existing or future media. You also grant to BlogPulse the right to sub-license these rights, and the right to bring an action for infringement of these rights.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">4. Limitation of Liability</h2>
              <p>
                The information on this website is provided free-of-charge, and you acknowledge that it would be unreasonable to hold us liable in respect of this website and the information on this website. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">5. Acceptable Use</h2>
              <p>
                You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website, or in any way which is unlawful, illegal, fraudulent or harmful, or in connection with any unlawful, illegal, fraudulent or harmful purpose or activity.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">6. Variation</h2>
              <p>
                We may revise these terms and conditions from time-to-time. Revised terms and conditions will apply to the use of this website from the date of the publication of the revised terms and conditions on this website.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">7. Entire Agreement</h2>
              <p>
                These terms and conditions, together with our privacy policy, constitute the entire agreement between you and BlogPulse in relation to your use of this website, and supersede all previous agreements in respect of your use of this website.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong> legal@blogpulse.com<br />
                <strong>Address:</strong> 1234 Blog Street, Suite 500, San Francisco, CA 94107
              </p>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default TermsOfService;

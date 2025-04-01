import React, { useRef, useState } from "react";
import BlogLayout from "@/components/BlogLayout";
import emailjs from '@emailjs/browser';
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9hd6b2j",
        "template_8dwxl73",
        form.current,
        "NMipxpGEOHGBgw_0K"
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Contact Us</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Have a question, feedback, or business inquiry? We'd love to hear
            from you. Fill out the form below or use one of our contact methods.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-secondary rounded-lg p-8 animate-fade-up">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-muted border border-muted-foreground/20 focus:border-blog-green focus:outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-muted border border-muted-foreground/20 focus:border-blog-green focus:outline-none"
                      placeholder="johndoe@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 rounded-md bg-muted border border-muted-foreground/20 focus:border-blog-green focus:outline-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 rounded-md bg-muted border border-muted-foreground/20 focus:border-blog-green focus:outline-none"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-blog-green hover:bg-green-600 text-white font-medium rounded-md transition-colors"
                >
                  Send Message
                </button>
              </form>

              {showPopup && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md text-center">
                  Your message has been sent successfully!
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-secondary rounded-lg p-8 animate-fade-up delay-100">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-blog-green mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Office Location</h3>
                      <p className="text-muted-foreground">
                        1234 Blog Street, Suite 500
                        <br />
                        San Francisco, CA 94107
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="text-blog-green mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Email Us</h3>
                      <p className="text-muted-foreground">info@blogpulse.com</p>
                      <p className="text-muted-foreground">editorial@blogpulse.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="text-blog-green mt-1 mr-4" />
                    <div>
                      <h3 className="font-medium mb-1">Call Us</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-muted-foreground">Mon-Fri, 9AM-5PM PST</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Add social media section here if needed */}
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default ContactUs;

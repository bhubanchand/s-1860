
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <Layout>
      <section className="py-12 sm:py-16">
        <div className="blog-container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              About Quill Oasis
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A blog dedicated to technology, design, and development.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <img
              src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Quill Oasis office"
              className="w-full rounded-lg shadow-lg"
            />

            <div className="mt-8 prose prose-lg max-w-none">
              <h2>Our Mission</h2>
              <p>
                At Quill Oasis, we believe in the power of knowledge sharing. Our
                mission is to provide high-quality, insightful content that helps
                developers, designers, and tech enthusiasts stay informed about the
                latest trends and best practices in the industry.
              </p>

              <h2>What We Cover</h2>
              <p>
                Our blog focuses on a variety of topics including:
              </p>
              <ul>
                <li>Web Development (Frontend and Backend)</li>
                <li>UI/UX Design</li>
                <li>Programming Languages and Frameworks</li>
                <li>Development Best Practices</li>
                <li>Technology Trends and Innovations</li>
              </ul>

              <h2>Our Team</h2>
              <p>
                Quill Oasis is maintained by a small team of passionate
                developers and designers who are dedicated to creating valuable
                content for the tech community. Our contributors come from diverse
                backgrounds and bring unique perspectives to the topics we cover.
              </p>

              <h2>Connect With Us</h2>
              <p>
                We love hearing from our readers! Whether you have a question,
                suggestion, or just want to say hello, feel free to reach out to
                us.
              </p>
            </div>

            <div className="mt-8 flex justify-center gap-4">
              <Button asChild>
                <Link to="/blog">Explore Articles</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:contact@quilloasis.com">Contact Us</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;

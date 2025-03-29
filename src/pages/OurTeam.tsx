
import React from "react";
import BlogLayout from "@/components/BlogLayout";

const TeamMember = ({ name, position, image, bio }: { name: string; position: string; image: string; bio: string }) => (
  <div className="bg-secondary rounded-lg overflow-hidden animate-fade-up">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-blog-green mb-4">{position}</p>
      <p className="text-muted-foreground">{bio}</p>
    </div>
  </div>
);

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      position: "Founder & Editor-in-Chief",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      bio: "Alex founded BlogPulse with a vision to create a platform that brings the latest entertainment and tech news to readers worldwide."
    },
    {
      name: "Sophia Williams",
      position: "Senior Entertainment Editor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      bio: "With over 10 years in entertainment journalism, Sophia brings deep industry knowledge and exclusive insights to our entertainment coverage."
    },
    {
      name: "Marcus Chen",
      position: "Technology Editor",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      bio: "Marcus has been covering technology and gadgets for 8 years, specializing in breaking down complex tech concepts for everyday readers."
    },
    {
      name: "Priya Patel",
      position: "Lifestyle Content Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
      bio: "Priya curates our lifestyle section, bringing the latest trends in fashion, wellness, and culture to our global audience."
    },
    {
      name: "James Wilson",
      position: "Gaming Editor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      bio: "A lifelong gamer and former esports competitor, James brings insider perspective to our gaming coverage."
    },
    {
      name: "Emma Rodriguez",
      position: "Social Media Manager",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
      bio: "Emma drives our social media strategy, ensuring our content reaches audiences across all major platforms."
    }
  ];

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Our Team</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            Meet the passionate writers, editors, and content creators who make BlogPulse your go-to source for entertainment, technology, lifestyle, and gaming news.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                position={member.position}
                image={member.image}
                bio={member.bio}
              />
            ))}
          </div>

          <div className="mt-20 bg-secondary rounded-lg p-8 animate-fade-up">
            <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
            <p className="text-muted-foreground mb-6">
              We're always looking for talented writers and editors to join the BlogPulse family. If you're passionate about entertainment, technology, lifestyle, or gaming and have strong writing skills, we'd love to hear from you.
            </p>
            <a 
              href="#" 
              className="inline-block px-6 py-3 bg-blog-green hover:bg-green-600 text-white font-medium rounded-md transition-colors"
            >
              View Open Positions
            </a>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default OurTeam;

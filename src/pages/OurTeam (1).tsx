import React from "react";
import BlogLayout from "@/components/BlogLayout";

const TeamMember = ({
  name,
  position,
  image,
  bio,
}: {
  name: string;
  position: string;
  image: string;
  bio: string;
}) => (
  <div className="bg-secondary rounded-lg overflow-hidden animate-fade-up">
    <img src={image} alt={name} className="w-full h-65 object-cover" />
    <div className="p-6">
      <h3 className="text-4xl font-bold mb-1">{name}</h3>
      <p className="text-blog-green mb-4">{position}</p>
      <p className="text-muted-foreground">{bio}</p>
    </div>
  </div>
);

const OurTeam = () => {
  const teamMembers = [
    {
      name: "Bhuban",
      position: "Founder & Editor-in-Chief",
      image:
        "https://res.cloudinary.com/dyzamqtdw/image/upload/v1743444325/profile_bhuban_tonight_nbupw7.svg",
      bio: "tonight was built with a simple goal: to be your go-to escape for entertainment, tech, and everything in between—with a side of wit and zero fluff.",
    },
    {
      name: "Vayu",
      position: "Frontend Developer & Logic Architect",
      image:
        "https://res.cloudinary.com/dyzamqtdw/image/upload/v1743420162/Vayu-Frontend_Developer_Logic_Architect_tp5upv.png",
      bio: "Passionate about building seamless user experiences, optimizing performance, and architecting clean, efficient code. Skilled in modern frontend technologies and logic-driven problem-solving.",
    },
  ];

  return (
    <BlogLayout>
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-center">Our Team</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-16">
            We’re not just a team—we’re a chaotic mix of caffeine addicts, meme enthusiasts, and creative rebels on a mission. From decoding tech trends to dishing out entertainment with a twist, we keep things fresh, fun, and occasionally unhinged (in the best way possible).
          </p>

          <div className="flex justify-center gap-5 flex-wrap mx-auto max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20" >
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
          </div>
        </div>
      </div>
    </BlogLayout>
  );
};

export default OurTeam;

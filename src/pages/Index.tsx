
import { Stats } from "@/components/Stats";
import { EngagementChart } from "@/components/EngagementChart";

const Index = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="mt-2 text-gray-600">Track your social media performance across platforms</p>
      </div>
      
      <div className="space-y-6">
        <Stats />
        <EngagementChart />
      </div>
    </div>
  );
};

export default Index;

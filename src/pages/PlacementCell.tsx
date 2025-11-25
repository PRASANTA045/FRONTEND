import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Award, Users } from "lucide-react";

const PlacementCell = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Placement Cell</h1>
        <p className="text-gray-600 mb-10">
          Our dedicated placement cell bridges the gap between students and employers, ensuring successful careers.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardContent className="p-6">
              <Briefcase className="mx-auto h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Career Guidance</h3>
              <p>Regular counseling sessions to help students choose the right career path.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Users className="mx-auto h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Recruiter Network</h3>
              <p>Strong partnerships with top IT and non-IT companies for placements.</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Award className="mx-auto h-10 w-10 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Success Stories</h3>
              <p>Thousands of students have been successfully placed in reputed organizations.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlacementCell;

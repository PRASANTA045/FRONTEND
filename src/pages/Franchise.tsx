import { Card, CardContent } from "@/components/ui/card";
import { Building2, TrendingUp, GraduationCap, Users } from "lucide-react";

export default function Franchise() {
  return (
    <div className="min-h-screen bg-muted/40 py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-6">
          BALC Franchise Program
        </h1>

        <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
          Join India’s fastest growing skills-training network. Start your own BALC
          centre with low investment, strong brand support, and high demand courses.
        </p>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Building2 className="w-10 h-10 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Low Investment</h3>
              <p className="text-muted-foreground text-sm">
                Affordable setup and fast break-even model.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">High Growth</h3>
              <p className="text-muted-foreground text-sm">
                Job-oriented skill programs with strong career demand.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <GraduationCap className="w-10 h-10 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Proven System</h3>
              <p className="text-muted-foreground text-sm">
                Pre-built course materials, LMS, exams & certificates.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-10 h-10 mx-auto mb-4" />
              <h3 className="font-semibold text-xl mb-2">Full Support</h3>
              <p className="text-muted-foreground text-sm">
                Marketing, training, and centre-setup support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

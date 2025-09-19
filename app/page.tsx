import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Users, TrendingUp, GraduationCap, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold text-primary tracking-tight">ABHYUDAYA</h1>
          <p className="text-xl text-muted-foreground font-medium">Empowering futures, growing together</p>
          <p className="text-lg text-foreground">Helping students to stay on track</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Description Section */}
        <section className="text-center max-w-4xl mx-auto space-y-6">
          <p className="text-lg leading-relaxed text-foreground">
            AI powered education dashboard system for dropout prevention and student counselling management. Empowering
            students, mentors, and guardians with data driven insights for academic success.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">AI Powered Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Advanced machine learning algorithms analyze student data to predict risk factors and provide actionable
                insights for early intervention.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Collaborative Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Connect students, teachers, and guardians in a unified platform for seamless communication and
                coordinated support efforts.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Real-time monitoring of academic performance, attendance patterns, and engagement levels with
                comprehensive reporting tools.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        {/* Role Selection */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Choose Your Role</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Student Portal</CardTitle>
                <CardDescription className="text-base">
                  Access your personalized dashboard with analytics, schedules, and progress tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Link href="/auth/student/login">
                    <Button className="w-full" size="lg">
                      Student Login
                    </Button>
                  </Link>
                  <Link href="/auth/student/signup">
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      Student Signup
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:scale-105">
              <CardHeader>
                <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Teacher Portal</CardTitle>
                <CardDescription className="text-base">
                  Monitor student progress, manage data, and receive risk alerts for early intervention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Link href="/auth/teacher/login">
                    <Button className="w-full" size="lg">
                      Teacher Login
                    </Button>
                  </Link>
                  <Link href="/auth/teacher/signup">
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      Teacher Signup
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer Section */}
        <section className="text-center py-12 border-t border-border">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Comprehensive Education Support Systems</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            By focusing on data fusion and timely alerts rather than complex algorithms, we enable institutes to
            intervene early and reduce drop-out rates through AI-based drop-out prediction and counseling systems.
          </p>
        </section>
      </main>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, BookOpen, TrendingUp, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { AttendanceChart } from "@/components/attendance-chart"
import { NotificationCenter } from "@/components/notification-center"

interface StudentData {
  name: string
  studentId: string
  attendance: number
  upcomingExams: Array<{
    subject: string
    date: string
    time: string
  }>
  timetable: Array<{
    day: string
    subjects: Array<{
      time: string
      subject: string
      room: string
    }>
  }>
  upcomingEvents: Array<{
    title: string
    date: string
    type: string
  }>
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")

    if (userType !== "student" || !userId) {
      router.push("/auth/student/login")
      return
    }

    // Mock student data
    setStudentData({
      name: "Alex Johnson",
      studentId: userId,
      attendance: 85,
      upcomingExams: [
        { subject: "Mathematics", date: "2024-01-15", time: "10:00 AM" },
        { subject: "Physics", date: "2024-01-18", time: "2:00 PM" },
        { subject: "Chemistry", date: "2024-01-22", time: "9:00 AM" },
      ],
      timetable: [
        {
          day: "Monday",
          subjects: [
            { time: "9:00 AM", subject: "Mathematics", room: "Room 101" },
            { time: "11:00 AM", subject: "Physics", room: "Room 203" },
            { time: "2:00 PM", subject: "Chemistry", room: "Lab 1" },
          ],
        },
        {
          day: "Tuesday",
          subjects: [
            { time: "9:00 AM", subject: "English", room: "Room 105" },
            { time: "11:00 AM", subject: "History", room: "Room 201" },
            { time: "2:00 PM", subject: "Biology", room: "Lab 2" },
          ],
        },
      ],
      upcomingEvents: [
        { title: "Science Fair", date: "2024-01-20", type: "Academic" },
        { title: "Sports Day", date: "2024-01-25", type: "Sports" },
        { title: "Parent-Teacher Meeting", date: "2024-01-30", type: "Meeting" },
      ],
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    router.push("/")
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {studentData.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter userType="student" />
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.attendance}%</div>
              <Progress value={studentData.attendance} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {studentData.attendance >= 75 ? "Good attendance" : "Needs improvement"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.upcomingExams.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Next: {studentData.upcomingExams[0]?.subject}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Classes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-2">Next: Mathematics at 9:00 AM</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Next: {studentData.upcomingEvents[0]?.title}</p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Attendance Analytics</CardTitle>
              <CardDescription>Your attendance pattern over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <AttendanceChart />
            </CardContent>
          </Card>

          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Exams</CardTitle>
              <CardDescription>Your scheduled examinations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.upcomingExams.map((exam, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">{exam.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {exam.date} at {exam.time}
                    </p>
                  </div>
                  <Badge variant="outline">Scheduled</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Timetable and Events */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Timetable */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Timetable</CardTitle>
              <CardDescription>Your class schedule for this week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.timetable.map((day, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="font-medium text-primary">{day.day}</h4>
                  <div className="space-y-2 ml-4">
                    {day.subjects.map((subject, subIndex) => (
                      <div key={subIndex} className="flex items-center justify-between text-sm">
                        <span>{subject.time}</span>
                        <span className="font-medium">{subject.subject}</span>
                        <span className="text-muted-foreground">{subject.room}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Important events and activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentData.upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge
                    variant={event.type === "Academic" ? "default" : event.type === "Sports" ? "secondary" : "outline"}
                  >
                    {event.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, LogOut, AlertTriangle, Users, TrendingDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { RiskDiversityChart } from "@/components/risk-diversity-chart"
import { NotificationCenter } from "@/components/notification-center"
import { RiskIndicator } from "@/components/risk-indicator"

interface Student {
  id: string
  name: string
  attendance: number
  assignmentsDone: number
  totalAssignments: number
  riskFactor: "Low" | "Medium" | "High"
  testScores: number
}

interface TeacherData {
  name: string
  teacherId: string
  students: Student[]
}

export default function TeacherDashboard() {
  const [teacherData, setTeacherData] = useState<TeacherData | null>(null)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [newStudent, setNewStudent] = useState({
    id: "",
    name: "",
    attendance: "",
    assignmentsDone: "",
    totalAssignments: "",
  })
  const router = useRouter()

  // Calculate risk factor based on attendance, assignment completion, and test scores
  const calculateRiskFactor = (
    attendance: number,
    assignmentsDone: number,
    totalAssignments: number,
    testScores = 75,
  ): "Low" | "Medium" | "High" => {
    const assignmentRate = totalAssignments > 0 ? (assignmentsDone / totalAssignments) * 100 : 0
    const riskScore = attendance * 0.4 + assignmentRate * 0.3 + testScores * 0.3

    if (riskScore >= 75) return "Low"
    if (riskScore >= 50) return "Medium"
    return "High"
  }

  const getRiskFactors = (student: Student): { name: string; value: number; weight: number; status: "good" | "warning" | "critical" }[] => {
    const assignmentRate = (student.assignmentsDone / student.totalAssignments) * 100;
  
    return [
      {
        name: "Attendance",
        value: student.attendance,
        weight: 0.4,
        status: student.attendance >= 75 ? "good" : student.attendance >= 50 ? "warning" : "critical",
      },
      {
        name: "Assignment Completion",
        value: Math.round(assignmentRate),
        weight: 0.3,
        status: assignmentRate >= 75 ? "good" : assignmentRate >= 50 ? "warning" : "critical",
      },
      {
        name: "Test Scores",
        value: student.testScores,
        weight: 0.3,
        status: student.testScores >= 75 ? "good" : student.testScores >= 50 ? "warning" : "critical",
      },
    ];
  };

  const getRiskScore = (student: Student) => {
    const assignmentRate = (student.assignmentsDone / student.totalAssignments) * 100
    return Math.round(student.attendance * 0.4 + assignmentRate * 0.3 + student.testScores * 0.3)
  }

  useEffect(() => {
    // Check if user is authenticated
    const userType = localStorage.getItem("userType")
    const userId = localStorage.getItem("userId")
    const teacherName = localStorage.getItem("teacherName")

    if (userType !== "teacher" || !userId) {
      router.push("/auth/teacher/login")
      return
    }

    // Mock teacher data with 10 students including test scores
    const mockStudents: Student[] = [
      {
        id: "ST001",
        name: "Alice Johnson",
        attendance: 92,
        assignmentsDone: 8,
        totalAssignments: 10,
        testScores: 88,
        riskFactor: "Low",
      },
      {
        id: "ST002",
        name: "Bob Smith",
        attendance: 78,
        assignmentsDone: 6,
        totalAssignments: 10,
        testScores: 72,
        riskFactor: "Medium",
      },
      {
        id: "ST003",
        name: "Carol Davis",
        attendance: 45,
        assignmentsDone: 3,
        totalAssignments: 10,
        testScores: 42,
        riskFactor: "High",
      },
      {
        id: "ST004",
        name: "David Wilson",
        attendance: 88,
        assignmentsDone: 9,
        totalAssignments: 10,
        testScores: 85,
        riskFactor: "Low",
      },
      {
        id: "ST005",
        name: "Emma Brown",
        attendance: 65,
        assignmentsDone: 5,
        totalAssignments: 10,
        testScores: 68,
        riskFactor: "Medium",
      },
      {
        id: "ST006",
        name: "Frank Miller",
        attendance: 95,
        assignmentsDone: 10,
        totalAssignments: 10,
        testScores: 92,
        riskFactor: "Low",
      },
      {
        id: "ST007",
        name: "Grace Lee",
        attendance: 72,
        assignmentsDone: 7,
        totalAssignments: 10,
        testScores: 78,
        riskFactor: "Medium",
      },
      {
        id: "ST008",
        name: "Henry Taylor",
        attendance: 38,
        assignmentsDone: 2,
        totalAssignments: 10,
        testScores: 35,
        riskFactor: "High",
      },
      {
        id: "ST009",
        name: "Ivy Chen",
        attendance: 85,
        assignmentsDone: 8,
        totalAssignments: 10,
        testScores: 82,
        riskFactor: "Low",
      },
      {
        id: "ST010",
        name: "Jack Anderson",
        attendance: 55,
        assignmentsDone: 4,
        totalAssignments: 10,
        testScores: 48,
        riskFactor: "High",
      },
    ]

    setTeacherData({
      name: teacherName || "Dr. Sarah Johnson",
      teacherId: userId,
      students: mockStudents,
    })
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userType")
    localStorage.removeItem("userId")
    localStorage.removeItem("teacherName")
    router.push("/")
  }

  const handleAddStudent = () => {
    if (!teacherData || !newStudent.id || !newStudent.name) return

    const attendance = Number.parseInt(newStudent.attendance) || 0
    const assignmentsDone = Number.parseInt(newStudent.assignmentsDone) || 0
    const totalAssignments = Number.parseInt(newStudent.totalAssignments) || 10
    const testScores = 75 // Default test score

    const riskFactor = calculateRiskFactor(attendance, assignmentsDone, totalAssignments, testScores)

    const student: Student = {
      id: newStudent.id,
      name: newStudent.name,
      attendance,
      assignmentsDone,
      totalAssignments,
      testScores,
      riskFactor,
    }

    setTeacherData({
      ...teacherData,
      students: [...teacherData.students, student],
    })

    setNewStudent({ id: "", name: "", attendance: "", assignmentsDone: "", totalAssignments: "" })
    setIsAddStudentOpen(false)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Mock file processing
      alert(`File "${file.name}" uploaded successfully! (This is a demo - actual Excel processing would happen here)`)
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "Low":
        return "default"
      case "Medium":
        return "secondary"
      case "High":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getHighRiskStudents = () => {
    return teacherData?.students.filter((student) => student.riskFactor === "High") || []
  }

  if (!teacherData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const highRiskStudents = getHighRiskStudents()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Welcome, {teacherData.name}</p>
          </div>
          <div className="flex items-center gap-4">
            {highRiskStudents.length > 0 && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {highRiskStudents.length} High Risk
              </Badge>
            )}
            <NotificationCenter userType="teacher" />
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
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherData.students.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Active students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
              <TrendingDown className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{highRiskStudents.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Need immediate attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  teacherData.students.reduce((acc, student) => acc + student.attendance, 0) /
                    teacherData.students.length,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground mt-2">Class average</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assignment Rate</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  teacherData.students.reduce(
                    (acc, student) => acc + (student.assignmentsDone / student.totalAssignments) * 100,
                    0,
                  ) / teacherData.students.length,
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground mt-2">Average completion</p>
            </CardContent>
          </Card>
        </div>

        {/* Risk Diversity Chart and File Upload */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Risk Diversity</CardTitle>
              <CardDescription>Distribution of student risk levels</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskDiversityChart students={teacherData.students} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Upload student data or add individual records</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload" className="text-sm font-medium">
                  Upload Excel File
                </Label>
                <div className="mt-2">
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="cursor-pointer"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Upload .xlsx or .xls files with student data</p>
              </div>

              <div className="pt-4 border-t">
                <Dialog open={isAddStudentOpen} onOpenChange={setIsAddStudentOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Single Student
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                      <DialogDescription>Enter student information to add them to your class</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input
                          id="student-id"
                          value={newStudent.id}
                          onChange={(e) => setNewStudent({ ...newStudent, id: e.target.value })}
                          placeholder="ST001"
                        />
                      </div>
                      <div>
                        <Label htmlFor="student-name">Student Name</Label>
                        <Input
                          id="student-name"
                          value={newStudent.name}
                          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="attendance">Attendance (%)</Label>
                        <Input
                          id="attendance"
                          type="number"
                          min="0"
                          max="100"
                          value={newStudent.attendance}
                          onChange={(e) => setNewStudent({ ...newStudent, attendance: e.target.value })}
                          placeholder="85"
                        />
                      </div>
                      <div>
                        <Label htmlFor="assignments-done">Assignments Done</Label>
                        <Input
                          id="assignments-done"
                          type="number"
                          min="0"
                          value={newStudent.assignmentsDone}
                          onChange={(e) => setNewStudent({ ...newStudent, assignmentsDone: e.target.value })}
                          placeholder="8"
                        />
                      </div>
                      <div>
                        <Label htmlFor="total-assignments">Total Assignments</Label>
                        <Input
                          id="total-assignments"
                          type="number"
                          min="1"
                          value={newStudent.totalAssignments}
                          onChange={(e) => setNewStudent({ ...newStudent, totalAssignments: e.target.value })}
                          placeholder="10"
                        />
                      </div>
                      <Button onClick={handleAddStudent} className="w-full">
                        Add Student
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Student Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Management</CardTitle>
            <CardDescription>Monitor and manage your students' progress and risk factors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Assignments</TableHead>
                  <TableHead>Test Scores</TableHead>
                  <TableHead>Risk Factor</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherData.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{student.attendance}%</span>
                        {student.attendance < 75 && <AlertTriangle className="w-4 h-4 text-destructive" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      {student.assignmentsDone}/{student.totalAssignments}
                      <span className="text-muted-foreground ml-1">
                        ({Math.round((student.assignmentsDone / student.totalAssignments) * 100)}%)
                      </span>
                    </TableCell>
                    <TableCell>{student.testScores}%</TableCell>
                    <TableCell>
                      <Badge variant={getRiskBadgeVariant(student.riskFactor)}>{student.riskFactor}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Risk Assessment Detail Modal */}
        {selectedStudent && (
          <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Detailed Risk Assessment</DialogTitle>
                <DialogDescription>
                  Comprehensive analysis and recommendations for {selectedStudent.name}
                </DialogDescription>
              </DialogHeader>
              <RiskIndicator
                studentId={selectedStudent.id}
                studentName={selectedStudent.name}
                riskFactors={getRiskFactors(selectedStudent)}
                overallRisk={selectedStudent.riskFactor}
                riskScore={getRiskScore(selectedStudent)}
              />
            </DialogContent>
          </Dialog>
        )}
      </main>
    </div>
  )
}

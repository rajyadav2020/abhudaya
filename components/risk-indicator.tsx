"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react"

interface RiskFactor {
  name: string
  value: number
  weight: number
  status: "good" | "warning" | "critical"
}

interface RiskIndicatorProps {
  studentId: string
  studentName: string
  riskFactors: RiskFactor[]
  overallRisk: "Low" | "Medium" | "High"
  riskScore: number
}

export function RiskIndicator({ studentId, studentName, riskFactors, overallRisk, riskScore }: RiskIndicatorProps) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low":
        return "text-green-600"
      case "Medium":
        return "text-yellow-600"
      case "High":
        return "text-red-600"
      default:
        return "text-gray-600"
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

  const getFactorIcon = (status: string) => {
    switch (status) {
      case "good":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "critical":
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return null
    }
  }

  const getRecommendations = () => {
    const recommendations = []

    riskFactors.forEach((factor) => {
      if (factor.status === "critical") {
        switch (factor.name) {
          case "Attendance":
            recommendations.push("Schedule immediate counseling session for attendance issues")
            recommendations.push("Contact parents/guardians about attendance concerns")
            break
          case "Assignment Completion":
            recommendations.push("Provide additional academic support and tutoring")
            recommendations.push("Create personalized assignment schedule")
            break
          case "Test Scores":
            recommendations.push("Arrange peer tutoring or study groups")
            recommendations.push("Consider alternative assessment methods")
            break
        }
      } else if (factor.status === "warning") {
        switch (factor.name) {
          case "Attendance":
            recommendations.push("Monitor attendance closely and send weekly reports")
            break
          case "Assignment Completion":
            recommendations.push("Check in weekly about assignment progress")
            break
          case "Test Scores":
            recommendations.push("Offer additional practice materials")
            break
        }
      }
    })

    return recommendations
  }

  const recommendations = getRecommendations()

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Risk Assessment: {studentName}
              <Badge variant={getRiskBadgeVariant(overallRisk)}>{overallRisk} Risk</Badge>
            </CardTitle>
            <CardDescription>Student ID: {studentId}</CardDescription>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskColor(overallRisk)}`}>{riskScore}%</div>
            <p className="text-sm text-muted-foreground">Risk Score</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Factors */}
        <div>
          <h4 className="font-medium mb-3">Risk Factors</h4>
          <div className="space-y-3">
            {riskFactors.map((factor, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getFactorIcon(factor.status)}
                    <span className="text-sm font-medium">{factor.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {factor.value}% (Weight: {factor.weight})
                  </span>
                </div>
                <Progress
                  value={factor.value}
                  className={`h-2 ${
                    factor.status === "critical"
                      ? "[&>div]:bg-red-500"
                      : factor.status === "warning"
                        ? "[&>div]:bg-yellow-500"
                        : "[&>div]:bg-green-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              Recommended Actions
            </h4>
            <ul className="space-y-2">
              {recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  {recommendation}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk Trend */}
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Risk Trend</span>
            <div className="flex items-center gap-1">
              {overallRisk === "High" ? (
                <>
                  <TrendingUp className="w-4 h-4 text-red-600" />
                  <span className="text-red-600">Increasing</span>
                </>
              ) : overallRisk === "Medium" ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-600">Stable</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4 text-green-600" />
                  <span className="text-green-600">Improving</span>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

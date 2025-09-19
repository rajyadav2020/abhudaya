"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Notification {
  id: string
  type: "high_risk" | "attendance_alert" | "assignment_overdue" | "system"
  title: string
  message: string
  studentId?: string
  studentName?: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
}

interface NotificationCenterProps {
  userType: "student" | "teacher"
}

export function NotificationCenter({ userType }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Mock notifications based on user type
    const mockNotifications: Notification[] =
      userType === "teacher"
        ? [
            {
              id: "1",
              type: "high_risk",
              title: "High Risk Student Alert",
              message:
                "Carol Davis has been identified as high risk due to low attendance (45%) and poor assignment completion.",
              studentId: "ST003",
              studentName: "Carol Davis",
              timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
              read: false,
              priority: "high",
            },
            {
              id: "2",
              type: "high_risk",
              title: "High Risk Student Alert",
              message: "Henry Taylor requires immediate attention - attendance dropped to 38%.",
              studentId: "ST008",
              studentName: "Henry Taylor",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
              read: false,
              priority: "high",
            },
            {
              id: "3",
              type: "attendance_alert",
              title: "Attendance Warning",
              message: "Jack Anderson has missed 3 consecutive classes.",
              studentId: "ST010",
              studentName: "Jack Anderson",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
              read: true,
              priority: "medium",
            },
            {
              id: "4",
              type: "system",
              title: "Weekly Report Ready",
              message: "Your weekly student progress report is now available for download.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
              read: true,
              priority: "low",
            },
          ]
        : [
            {
              id: "1",
              type: "assignment_overdue",
              title: "Assignment Due Soon",
              message: "Mathematics Assignment #5 is due tomorrow at 11:59 PM.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
              read: false,
              priority: "medium",
            },
            {
              id: "2",
              type: "attendance_alert",
              title: "Attendance Notice",
              message: "Your attendance has dropped to 85%. Maintain above 75% to avoid academic issues.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
              read: false,
              priority: "medium",
            },
            {
              id: "3",
              type: "system",
              title: "Exam Schedule Updated",
              message: "Physics exam has been rescheduled to January 20th, 2:00 PM.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
              read: true,
              priority: "low",
            },
          ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [userType])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
  }

  const removeNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    if (notification && !notification.read) {
      setUnreadCount((prev) => Math.max(0, prev - 1))
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "high_risk":
        return <AlertTriangle className="w-4 h-4 text-destructive" />
      case "attendance_alert":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "assignment_overdue":
        return <Clock className="w-4 h-4 text-orange-500" />
      default:
        return <Bell className="w-4 h-4 text-primary" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      default:
        return <Badge variant="outline">Low</Badge>
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return `${days}d ago`
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <Bell className="w-4 h-4 mr-2" />
          Notifications
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Notifications
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>Stay updated with important alerts and information</SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-colors ${
                    !notification.read ? "bg-muted/50 border-primary/20" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getNotificationIcon(notification.type)}
                        <CardTitle className="text-sm">{notification.title}</CardTitle>
                        {!notification.read && <div className="w-2 h-2 bg-primary rounded-full" />}
                      </div>
                      <div className="flex items-center gap-2">
                        {getPriorityBadge(notification.priority)}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm">{notification.message}</CardDescription>
                    {notification.studentName && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          Student: {notification.studentName}
                        </Badge>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">{formatTimestamp(notification.timestamp)}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

"use client"

import { DashboardShell } from "@/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage your LMS configuration and preferences</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <div className="grid gap-6">
              <Card className="rounded-xl border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-foreground">Platform Details</CardTitle>
                  <CardDescription>General settings for your LMS platform</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="platform-name">Platform Name</Label>
                    <Input id="platform-name" defaultValue="EduAdmin LMS" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="admin-email">Admin Email</Label>
                      <Input id="admin-email" type="email" defaultValue="admin@eduadmin.com" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern (EST)</SelectItem>
                          <SelectItem value="cst">Central (CST)</SelectItem>
                          <SelectItem value="mst">Mountain (MST)</SelectItem>
                          <SelectItem value="pst">Pacific (PST)</SelectItem>
                          <SelectItem value="utc">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Academic Year</Label>
                      <Select defaultValue="2025-2026">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024-2025">2024-2025</SelectItem>
                          <SelectItem value="2025-2026">2025-2026</SelectItem>
                          <SelectItem value="2026-2027">2026-2027</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Maintenance Mode</p>
                      <p className="text-xs text-muted-foreground">Temporarily disable access for non-admin users</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="rounded-xl border-border/60 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-semibold text-foreground">Notification Preferences</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                {[
                  { title: "Email Notifications", desc: "Receive email alerts for important events" },
                  { title: "New Course Alerts", desc: "Get notified when new courses are added" },
                  { title: "Quiz Submissions", desc: "Alert when students submit quizzes" },
                  { title: "Faculty Updates", desc: "Notifications about faculty changes" },
                  { title: "Report Generation", desc: "Alert when scheduled reports are ready" },
                  { title: "System Alerts", desc: "Critical system and security notifications" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 3 || i === 5} />
                  </div>
                ))}
                <Separator />
                <div className="flex justify-end">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <div className="grid gap-6">
              <Card className="rounded-xl border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-foreground">Password</CardTitle>
                  <CardDescription>Update your admin password</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-xl border-border/60 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base font-semibold text-foreground">Security Options</CardTitle>
                  <CardDescription>Additional security configurations</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                      <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Session Timeout</p>
                      <p className="text-xs text-muted-foreground">Auto-logout after inactivity</p>
                    </div>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">Login Notifications</p>
                      <p className="text-xs text-muted-foreground">Get notified of new sign-ins from unrecognized devices</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

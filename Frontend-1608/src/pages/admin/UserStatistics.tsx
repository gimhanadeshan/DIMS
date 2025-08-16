import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Shield, Users, Activity, UserPlus, UserMinus, TrendingUp, Clock, Globe, MonitorCog } from "lucide-react";

const UserStatistics = () => {
  const menuItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: BarChart },
    { label: "System Status", href: "/admin/system-status", icon: MonitorCog },
    { label: "User Statistics", href: "/admin/user-statistics", icon: Users },
    { label: "Security Reports", href: "/admin/security-reports", icon: Shield },
    { label: "Blockchain", href: "/admin/blockchain", icon: Globe },
    { label: "System Logs", href: "/admin/system-logs", icon: Activity },
  ];

  const recentUsers = [
    { name: "Alice Johnson", email: "alice@example.com", joinDate: "2024-01-15", status: "Active" },
    { name: "Bob Smith", email: "bob@example.com", joinDate: "2024-01-14", status: "Active" },
    { name: "Carol Williams", email: "carol@example.com", joinDate: "2024-01-13", status: "Inactive" },
    { name: "David Brown", email: "david@example.com", joinDate: "2024-01-12", status: "Active" },
    { name: "Eva Davis", email: "eva@example.com", joinDate: "2024-01-11", status: "Pending" },
  ];

  return (
    <DashboardLayout menuItems={menuItems} title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Statistics</h1>
          <p className="text-muted-foreground">Monitor user activities and registration trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">1,247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-accent">892</div>
              <p className="text-xs text-muted-foreground">71.5% of total users</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Signups</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">47</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">24m</div>
              <p className="text-xs text-muted-foreground">Session duration</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>User Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">January 2024</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium">312</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">December 2023</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm font-medium">245</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">November 2023</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <span className="text-sm font-medium">198</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">October 2023</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <span className="text-sm font-medium">156</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>User Activity Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Daily Active Users</span>
                <span className="text-sm font-medium">423</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Weekly Active Users</span>
                <span className="text-sm font-medium">756</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Monthly Active Users</span>
                <span className="text-sm font-medium">892</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Inactive Users</span>
                <span className="text-sm font-medium text-muted-foreground">355</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Recent User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' :
                      user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Joined: {user.joinDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default UserStatistics;
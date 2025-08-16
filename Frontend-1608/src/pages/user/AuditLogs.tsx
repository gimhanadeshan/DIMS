import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, User, FileText, Search, Filter, Shield, Settings, LogIn, Eye, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const AuditLogs = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const menuItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: BarChart3 },
    { label: "Profile", href: "/user/profile", icon: User },
    { label: "Blockchain", href: "/user/blockchain-user", icon: Globe },
    { label: "Audit Logs", href: "/user/audit-logs", icon: FileText },
  ];

  const auditLogs = [
    {
      id: 1,
      action: "Profile Updated",
      details: "Changed phone number and department information",
      timestamp: "2024-01-16 14:30:25",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0 (Windows)",
      type: "profile"
    },
    {
      id: 2,
      action: "Login Successful",
      details: "User logged in successfully",
      timestamp: "2024-01-16 09:15:42",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0 (Windows)",
      type: "auth"
    },
    {
      id: 3,
      action: "Password Changed",
      details: "User changed account password",
      timestamp: "2024-01-15 16:22:18",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0 (Windows)",
      type: "security"
    },
    {
      id: 4,
      action: "Security Settings Updated",
      details: "Enabled two-factor authentication",
      timestamp: "2024-01-15 16:20:03",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0 (Windows)",
      type: "security"
    },
    {
      id: 5,
      action: "Login Attempt Failed",
      details: "Failed login attempt with incorrect password",
      timestamp: "2024-01-14 11:35:28",
      ipAddress: "192.168.1.95",
      userAgent: "Safari 17.0 (macOS)",
      type: "auth"
    },
    {
      id: 6,
      action: "Profile Viewed",
      details: "User accessed profile information",
      timestamp: "2024-01-14 10:12:44",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0 (Windows)",
      type: "access"
    },
    {
      id: 7,
      action: "Notification Preferences Updated",
      details: "Changed email notification settings",
      timestamp: "2024-01-13 15:45:12",
      ipAddress: "192.168.1.100",
      userAgent: "Chrome 120.0.0.0 (Windows)",
      type: "profile"
    },
    {
      id: 8,
      action: "Login Successful",
      details: "User logged in from new device",
      timestamp: "2024-01-13 08:30:55",
      ipAddress: "10.0.0.45",
      userAgent: "Firefox 121.0 (Windows)",
      type: "auth"
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "auth":
        return <LogIn className="w-4 h-4 text-blue-600" />;
      case "security":
        return <Shield className="w-4 h-4 text-red-600" />;
      case "profile":
        return <User className="w-4 h-4 text-green-600" />;
      case "access":
        return <Eye className="w-4 h-4 text-purple-600" />;
      default:
        return <Settings className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionBadge = (type: string) => {
    switch (type) {
      case "auth":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "security":
        return "bg-red-100 text-red-800 border-red-200";
      case "profile":
        return "bg-green-100 text-green-800 border-green-200";
      case "access":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const logCounts = {
    auth: auditLogs.filter(log => log.type === "auth").length,
    security: auditLogs.filter(log => log.type === "security").length,
    profile: auditLogs.filter(log => log.type === "profile").length,
    access: auditLogs.filter(log => log.type === "access").length,
    total: auditLogs.length
  };

  return (
    <DashboardLayout menuItems={menuItems} title="User Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground">View your account activity and security events</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat">{logCounts.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Login Events</CardTitle>
              <LogIn className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-blue-600">{logCounts.auth}</div>
              <p className="text-xs text-muted-foreground">Authentication events</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Events</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-red-600">{logCounts.security}</div>
              <p className="text-xs text-muted-foreground">Security changes</p>
            </CardContent>
          </Card>

          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Updates</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="dashboard-stat text-green-600">{logCounts.profile}</div>
              <p className="text-xs text-muted-foreground">Profile modifications</p>
            </CardContent>
          </Card>
        </div>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Activity Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-48">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="auth">Authentication</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="profile">Profile</SelectItem>
                    <SelectItem value="access">Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle>Activity History ({filteredLogs.length} entries)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getActionIcon(log.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 text-xs rounded-full border ${getActionBadge(log.type)}`}>
                            {log.type.toUpperCase()}
                          </span>
                          <h3 className="font-medium text-sm">{log.action}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>IP Address: {log.ipAddress}</p>
                          <p>User Agent: {log.userAgent}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
              {filteredLogs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No activities match your current filters.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AuditLogs;
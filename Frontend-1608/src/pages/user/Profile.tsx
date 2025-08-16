import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BarChart3, User, FileText, Save, Shield, Bell, Lock, Globe } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { label: "Dashboard", href: "/user/dashboard", icon: BarChart3 },
    { label: "Profile", href: "/user/profile", icon: User },
    { label: "Blockchain", href: "/user/blockchain-user", icon: Globe },
    { label: "Audit Logs", href: "/user/audit-logs", icon: FileText },
  ];

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    department: "",
    jobTitle: "",
    location: "",
    bio: ""
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    securityNotifications: true,
    systemUpdates: false,
    marketingEmails: false
  });

  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    sessionTimeout: "30",
    passwordExpiry: "90"
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSecurityUpdate = () => {
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved.",
    });
  };

  return (
    <DashboardLayout menuItems={menuItems} title="User Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={profile.department}
                      onChange={(e) => setProfile(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Engineering"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profile.jobTitle}
                      onChange={(e) => setProfile(prev => ({ ...prev, jobTitle: e.target.value }))}
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailAlerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important notifications via email</p>
                  </div>
                  <Switch
                    id="emailAlerts"
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, emailAlerts: checked }));
                      handleNotificationUpdate();
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="securityNotifications">Security Notifications</Label>
                    <p className="text-sm text-muted-foreground">Get alerts for security events</p>
                  </div>
                  <Switch
                    id="securityNotifications"
                    checked={notifications.securityNotifications}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, securityNotifications: checked }));
                      handleNotificationUpdate();
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="systemUpdates">System Updates</Label>
                    <p className="text-sm text-muted-foreground">Notifications about system maintenance</p>
                  </div>
                  <Switch
                    id="systemUpdates"
                    checked={notifications.systemUpdates}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, systemUpdates: checked }));
                      handleNotificationUpdate();
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Receive product updates and newsletters</p>
                  </div>
                  <Switch
                    id="marketingEmails"
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => {
                      setNotifications(prev => ({ ...prev, marketingEmails: checked }));
                      handleNotificationUpdate();
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={security.twoFactorEnabled}
                    onCheckedChange={(checked) => {
                      setSecurity(prev => ({ ...prev, twoFactorEnabled: checked }));
                      handleSecurityUpdate();
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={security.sessionTimeout}
                    onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    min="5"
                    max="480"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                  <Input
                    id="passwordExpiry"
                    type="number"
                    value={security.passwordExpiry}
                    onChange={(e) => setSecurity(prev => ({ ...prev, passwordExpiry: e.target.value }))}
                    min="30"
                    max="365"
                  />
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Password change",
                      description: "Redirecting to password change form...",
                    });
                  }}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Shield, Wallet } from "lucide-react";

import HeroGradient from "../components/HeroGradient/HeroGradient.js";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Redirect based on role
        if (email === 'admin@gmail.com') {
          navigate('/admin/dashboard');
        } else {
          navigate('/user/dashboard');
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
     
    <HeroGradient />  
    
    <div className="header-container min-h-screen flex items-center justify-center p-4">
      
      <Card className="w-full max-w-md dashboard-card bg-neutral-400/20 hover:bg-neutral-400/30 text-neutral-50 backdrop-blur-md border-neutral-400">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-neutral-200" />
          </div>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription className="text-neutral-200">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className=" bg-neutral-400/20 "
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-neutral-400/20"
                required
              />
            </div>
            <Button type="submit" className="w-full hover:bg-blue-800" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-200" disabled={loading}>
              <Wallet className="w-5 h-5" />
              {loading ? "Connecting..." : "Connect MetaMask"}
            </Button>
          </form>
          
          <div className="mt-4 text-center text-sm">
            <p className="text-neutral-200">
              Don't have an account?{" "}
              <Link to="/signup" className="text-neutral-50 font-extrabold hover:underline">
                Sign up
              </Link>
            </p>
            <p className="text-muted-foreground mt-2">
              <Link to="/" className="text-neutral-50 font-extrabold  hover:underline">
                Back to Home
              </Link>
            </p>
          </div>

        </CardContent>
      </Card>
    </div>
    </section>
  );
};

export default Login;
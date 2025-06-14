
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { DollarSign, Mail, Lock, User } from "lucide-react";
import DynamicAiHint from "@/components/DynamicAiHint";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [rippleStyle, setRippleStyle] = useState<any>(null);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const triggerRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    setRippleStyle({ top: y, left: x, width: size, height: size });
    setTimeout(() => setRippleStyle(null), 400);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/dashboard";
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.captcha !== "8") {
      alert("Please solve the captcha correctly");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Redirect to dashboard after successful signup
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer hover-scale" onClick={handleLogoClick}>
            <DollarSign className="h-10 w-10 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-900">FinnTra</h1>
          </div>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogoClick}>
              Back to Home
            </Button>
          </div>
        </div>
      </header>
      <div className="flex items-center justify-center py-10 flex-1">
        <Card className="w-full max-w-md shadow-lg border-0 animate-fade-in">
          <CardHeader className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg w-fit mx-auto mb-4">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to FinnTra</CardTitle>
            <CardDescription>Manage your finances with ease</CardDescription>
          </CardHeader>
          <CardContent>
            <DynamicAiHint />
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="space-y-6 transition-all duration-500">
              <TabsList className="grid w-full grid-cols-2 overflow-hidden rounded-lg">
                <TabsTrigger
                  value="login"
                  className={`transition-all duration-300 ${activeTab === "login" ? "bg-indigo-100" : ""}`}
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className={`transition-all duration-300 ${activeTab === "signup" ? "bg-indigo-100" : ""}`}
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            email: e.target.value,
                          })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 relative overflow-hidden ripple-btn hover:scale-105"
                    onClick={triggerRipple}
                  >
                    {rippleStyle && (
                      <span
                        className="ripple"
                        style={{
                          ...rippleStyle,
                        }}
                      />
                    )}
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signupData.name}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            name: e.target.value,
                          })
                        }
                        className="pl-10"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signupData.email}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        className="pl-10"
                        required
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signupData.password}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        className="pl-10"
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={signupData.confirmPassword}
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="pl-10"
                        required
                        autoComplete="new-password"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-captcha" className="flex items-center gap-1">
                      <span>Captcha</span>
                      <span className="inline-block rounded px-2 py-0.5 text-xs text-indigo-700 bg-indigo-100 dark:bg-indigo-800 dark:text-indigo-300 ml-2">
                        What is 3 + 5?
                      </span>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="signup-captcha" 
                        type="text" 
                        placeholder="Your answer" 
                        className="pl-3"
                        value={signupData.captcha}
                        onChange={e => setSignupData({ ...signupData, captcha: e.target.value })}
                        required 
                        pattern="8" 
                        title="Please solve the captcha question." 
                        autoComplete="off" 
                      />
                    </div>
                    <span className="text-xs text-muted-foreground block mt-0.5">
                      Please solve the math to continue (demo only).
                    </span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 relative overflow-hidden ripple-btn hover:scale-105"
                    onClick={triggerRipple}
                  >
                    {rippleStyle && (
                      <span
                        className="ripple"
                        style={{
                          ...rippleStyle,
                        }}
                      />
                    )}
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

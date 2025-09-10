import { useState } from "react";
import { Smartphone, Lock, Leaf, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { RoleSelect } from "@/components/ui/role-select";
import heroBackground from "@/assets/agri-hero-bg.jpg";

export default function AgriLoginPage() {
  const [role, setRole] = useState("farmer");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { mobileNumber, password, role });
    // Handle login logic here
  };

  const handleRegister = () => {
    console.log("Navigate to registration");
    // Handle registration navigation
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'var(--gradient-overlay)'
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-primary-glow animate-float">
        <Leaf size={32} />
      </div>
      <div className="absolute bottom-20 right-16 text-harvest animate-float" style={{ animationDelay: '1s' }}>
        <Sprout size={28} />
      </div>
      <div className="absolute top-1/3 right-20 text-nature animate-float" style={{ animationDelay: '2s' }}>
        <Leaf size={24} />
      </div>

      {/* Login Card */}
      <div className="relative z-20 animate-scale-in">
        <div className="glass-effect rounded-2xl p-8 w-96 shadow-xl border border-primary/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">AgriChain</h1>
            </div>
            <p className="text-muted-foreground">
              Connect to the agricultural supply chain
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <FormField
              label="Mobile Number"
              type="tel"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              icon={<Smartphone size={16} />}
            />

            <FormField
              label="OTP / Password"
              type="password"
              placeholder="Enter OTP or Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock size={16} />}
            />

            <RoleSelect
              value={role}
              onValueChange={setRole}
            />

            <div className="space-y-3 pt-4">
              <Button 
                type="submit"
                variant="agri"
                size="lg"
                className="w-full h-12"
              >
                🔑 Sign In
              </Button>

              <Button
                type="button"
                variant="glass"
                size="lg"
                className="w-full h-12"
                onClick={handleRegister}
              >
                📝 Create Account
              </Button>
            </div>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 pt-6 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Need help? {" "}
              <button className="text-primary hover:text-primary-glow font-medium transition-colors">
                Contact Support
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="flex justify-center gap-4 mt-6">
          <div className="glass-effect rounded-lg px-4 py-2 border border-primary/20">
            <p className="text-xs text-muted-foreground">🔒 Secure Login</p>
          </div>
          <div className="glass-effect rounded-lg px-4 py-2 border border-primary/20">
            <p className="text-xs text-muted-foreground">🌱 Sustainable Future</p>
          </div>
          <div className="glass-effect rounded-lg px-4 py-2 border border-primary/20">
            <p className="text-xs text-muted-foreground">📱 Mobile First</p>
          </div>
        </div>
      </div>
    </div>
  );
}
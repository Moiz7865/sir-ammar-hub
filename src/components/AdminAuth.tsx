
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Lock } from "lucide-react";

const ADMIN_PASSWORD = "sir12";

interface AdminAuthProps {
  onAuth: (success: boolean) => void;
}

const AdminAuth = ({ onAuth }: AdminAuthProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true");
      onAuth(true);
      toast({
        title: "Success",
        description: "Welcome to admin dashboard",
      });
    } else {
      setError(true);
      toast({
        title: "Error",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="glass-card border-red-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
                <Lock className="h-6 w-6" />
                Admin Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  className={`bg-black/40 border-red-500/20 text-white ${
                    error ? "border-red-500" : ""
                  }`}
                />
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;

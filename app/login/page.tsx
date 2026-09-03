import { isDevBypassAllowed } from "@/lib/devBypass";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return <LoginForm devBypassAllowed={isDevBypassAllowed()} />;
}

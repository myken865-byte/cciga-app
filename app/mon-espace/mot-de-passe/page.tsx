import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function ChangePasswordPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-14 lg:px-6">
      <Link href="/mon-espace" className="mb-6 inline-block text-sm text-primary hover:underline">
        ← Mon espace
      </Link>
      <ChangePasswordForm />
    </div>
  );
}

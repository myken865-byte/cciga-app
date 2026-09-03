import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession, SESSION_COOKIE } from "@/lib/auth";
import BackButton from "@/components/BackButton";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function ChangePasswordPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-14">
      <BackButton fallbackHref="/mon-espace" label="Retour à mon espace" />
      <h1 className="mb-6 mt-4 text-2xl font-bold text-foreground">Mot de passe</h1>
      <ChangePasswordForm />
    </div>
  );
}

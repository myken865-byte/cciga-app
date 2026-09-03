import ResetPasswordForm from "@/components/ResetPasswordForm";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="mx-auto max-w-sm px-4 py-14">
      <p className="mb-2 text-center text-sm font-semibold uppercase tracking-widest text-accent">
        CCIGA ID
      </p>
      <h1 className="mb-8 text-center text-2xl font-bold text-foreground">Réinitialisation</h1>
      <ResetPasswordForm token={token} />
    </div>
  );
}

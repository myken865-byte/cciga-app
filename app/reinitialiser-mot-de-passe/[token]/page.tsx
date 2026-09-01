import ResetPasswordForm from "@/components/ResetPasswordForm";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <div className="mx-auto max-w-xl px-4 py-14 lg:px-6">
      <p className="mb-4 text-sm text-muted">
        Ce lien est valable une seule fois et pour une durée limitée. Choisissez un nouveau mot
        de passe ci-dessous.
      </p>
      <ResetPasswordForm token={token} />
    </div>
  );
}

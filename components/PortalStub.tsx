export default function PortalStub({
  title,
  description,
  name,
  ccigaId,
}: {
  title: string;
  description: string;
  name?: string;
  ccigaId?: string;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-14 text-center lg:px-6">
      <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
        🔒
      </span>
      <h1 className="mb-3 text-2xl font-bold text-foreground lg:text-3xl">{title}</h1>
      {name && (
        <p className="mb-2 font-medium text-foreground">
          Bonjour {name}
          {ccigaId && <span className="ml-2 font-mono text-sm text-muted">{ccigaId}</span>}
        </p>
      )}
      <p className="mb-2 text-muted">{description}</p>
      <p className="text-sm text-muted">
        Les fonctionnalités complètes de ce portail arrivent avec le déploiement
        du LMS et du moteur d&apos;automatisation du CCIGA.
      </p>
    </div>
  );
}

export default function PortalHeader({
  title,
  name,
  ccigaId,
}: {
  title: string;
  name?: string;
  ccigaId?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 lg:px-6">
      <h1 className="text-2xl font-bold text-foreground lg:text-3xl">{title}</h1>
      {name && (
        <p className="mt-1 text-muted">
          Bonjour {name}
          {ccigaId && <span className="ml-2 font-mono text-sm text-muted">{ccigaId}</span>}
        </p>
      )}
    </div>
  );
}

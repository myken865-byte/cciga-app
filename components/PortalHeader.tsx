import BackToPortalsButton from "@/components/BackToPortalsButton";

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
    <div className="border-b border-border bg-gradient-to-br from-primary via-primary to-primary-light">
      <div className="mx-auto max-w-2xl lg:max-w-4xl xl:max-w-5xl px-4 py-8 lg:px-6 lg:py-10">
        <BackToPortalsButton tone="dark" className="mb-3" />
        <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">{title}</h1>
        {name && (
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-white/85">
            <span>Bonjour {name}</span>
            {ccigaId && (
              <span className="badge badge-neutral bg-white/15 font-mono text-white">{ccigaId}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

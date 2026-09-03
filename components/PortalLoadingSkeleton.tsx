/** Shared loading skeleton for portal routes — reuses the .skeleton token from the design system. */
export default function PortalLoadingSkeleton({ withHeader = true }: { withHeader?: boolean }) {
  return (
    <div>
      {withHeader && (
        <div className="border-b border-border bg-gradient-to-br from-primary via-primary to-primary-light">
          <div className="mx-auto max-w-2xl px-4 py-8 lg:max-w-4xl lg:px-6 lg:py-10 xl:max-w-5xl">
            <div className="skeleton h-7 w-48 rounded-md bg-white/20" />
            <div className="skeleton mt-3 h-4 w-32 rounded-md bg-white/20" />
          </div>
        </div>
      )}
      <div className="mx-auto max-w-2xl space-y-4 px-4 pb-14 pt-6 lg:max-w-4xl lg:px-6 xl:max-w-5xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="stat-tile">
              <div className="skeleton h-3 w-16 rounded" />
              <div className="skeleton mt-2 h-5 w-10 rounded" />
            </div>
          ))}
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card space-y-3 p-5 sm:p-6">
            <div className="skeleton h-4 w-40 rounded" />
            <div className="skeleton h-14 w-full rounded-lg" />
            <div className="skeleton h-14 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

import { socialLinks, isSafeExternalUrl, type SocialPlatformKey } from "@/lib/socialLinks";
import { WhatsAppIcon, FacebookIcon, TikTokIcon, InstagramIcon, YouTubeIcon, LinkGlobeIcon } from "@/components/socialIcons";

const icons: Record<SocialPlatformKey, (props: { className?: string }) => React.ReactElement> = {
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  autres: LinkGlobeIcon,
};

export default function SocialLinksSection() {
  return (
    <div className="border-t border-white/10 px-4 py-10 lg:px-6">
      <div className="mx-auto max-w-6xl">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-light">
          Liens officiels &amp; réseaux sociaux
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {socialLinks.map((link) => {
            const Icon = icons[link.key];
            const href = isSafeExternalUrl(link.url) ? link.url : null;
            const content = (
              <>
                <Icon className="mb-2 h-6 w-6 text-accent-light" />
                <p className="text-sm font-semibold text-white">{link.name}</p>
                <p className="mt-0.5 text-xs text-white/70">{link.description}</p>
                {!href && (
                  <p className="mt-2 text-[11px] font-medium text-accent-light">
                    À COMPLÉTER — lien officiel à fournir
                  </p>
                )}
              </>
            );

            return href ? (
              <a
                key={link.key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-white/15 bg-white/5 p-4 transition-colors hover:border-accent-light hover:bg-white/10"
              >
                {content}
              </a>
            ) : (
              <div
                key={link.key}
                aria-disabled="true"
                className="cursor-not-allowed rounded-xl border border-dashed border-white/15 bg-white/[0.03] p-4 opacity-70"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

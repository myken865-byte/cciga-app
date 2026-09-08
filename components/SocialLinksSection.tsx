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

/** Each platform's own recognizable brand color — never a single uniform tint. */
const iconColors: Record<SocialPlatformKey, string> = {
  whatsapp: "text-[#25D366]",
  facebook: "text-[#1877F2]",
  tiktok: "text-[#000000]",
  instagram: "text-[#C13584]",
  youtube: "text-[#FF0000]",
  autres: "text-primary-dark",
};

export default function SocialLinksSection() {
  return (
    <div className="rounded-[40px] border-[10px] border-primary-dark bg-[#fdf8ec] p-6 shadow-lg sm:p-8">
      <div className="mb-8 text-center">
        <h3 className="text-lg font-bold uppercase tracking-wide text-primary-dark">
          Liens officiels &amp; réseaux sociaux
        </h3>
        <div className="mx-auto mt-3 h-[3px] w-16 rounded-full bg-accent" />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {socialLinks.map((link) => {
          const Icon = icons[link.key];
          const href = isSafeExternalUrl(link.url) ? link.url : null;
          const content = (
            <>
              <Icon className={`mx-auto mb-2 h-6 w-6 ${iconColors[link.key]}`} />
              <p className="text-sm font-bold text-accent">{link.name}</p>
              <p className="mt-0.5 text-xs text-muted">{link.description}</p>
            </>
          );

          return href ? (
            <a
              key={link.key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border-2 border-primary-dark bg-white p-4 text-center shadow-sm transition hover:shadow-md"
            >
              {content}
            </a>
          ) : (
            <div key={link.key} className="rounded-2xl border-2 border-primary-dark bg-white p-4 text-center shadow-sm">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

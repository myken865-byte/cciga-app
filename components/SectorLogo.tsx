import { sectorLogoAlt, sectorLogoPath, type Sector } from "@/lib/branding";

export default function SectorLogo({ sector, className }: { sector: Sector; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={sectorLogoPath(sector)} alt={sectorLogoAlt[sector]} className={className} />
  );
}

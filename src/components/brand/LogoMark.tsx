import { FlowLogo } from "./FlowLogo";

export function LogoMark({
  className,
  href = "/",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  href?: "/" | string;
}) {
  return <FlowLogo size="nav" href={href} className={className} />;
}

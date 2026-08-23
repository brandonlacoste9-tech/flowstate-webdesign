import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";

export function LogoMark({
  className,
  markClassName,
  showWordmark = true,
  href = "/",
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  href?: "/" | string;
}) {
  const mark = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src="/brand/flowstate-mark.svg"
        alt=""
        className={cn("h-8 w-8 shrink-0 rounded-[9px]", markClassName)}
      />
      {showWordmark ? (
        <span className="font-display text-[1.35rem] leading-none tracking-tight text-text">
          Flowstate
        </span>
      ) : null}
    </span>
  );

  if (href) {
    return (
      <Link href={href as "/"} className="group inline-flex items-center" aria-label="Flowstate">
        {mark}
      </Link>
    );
  }

  return mark;
}

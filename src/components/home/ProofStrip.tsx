import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { studio } from "@/content/studio";

export function ProofStrip() {
  const t = useTranslations("proof");

  return (
    <section className="border-y border-border/60 py-14 sm:py-20">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                {t("response")}
              </p>
              <a
                href={studio.phoneHref}
                className="mt-3 block font-display text-4xl leading-none text-text transition-colors hover:text-accent sm:text-5xl lg:text-6xl"
              >
                {studio.phone}
              </a>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                {t("responseDetail")}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
              <span>{t("montreal")}</span>
              <span>{t("bilingual")}</span>
              <span>{t("craft")}</span>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

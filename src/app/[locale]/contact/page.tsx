import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/contact/ContactForm";
import { Button } from "@/components/ui/Button";
import { studio } from "@/content/studio";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <FadeIn>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {t("directEmail")}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-text sm:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <a
              href={studio.phoneHref}
              className="mt-8 block font-display text-4xl leading-none text-text transition-colors hover:text-accent sm:text-5xl"
            >
              {studio.phone}
            </a>
            <p className="mt-4 text-base text-muted">{t("description")}</p>
            <p className="mt-2 text-sm text-muted">
              {studio.city[locale as "en" | "fr"]} · {studio.domain}
            </p>
            <div className="mt-8">
              <Button href={studio.phoneHref}>{t("call")}</Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}

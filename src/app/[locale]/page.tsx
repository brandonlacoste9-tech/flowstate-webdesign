import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { WorkMarquee } from "@/components/home/WorkMarquee";
import { ProofStrip } from "@/components/home/ProofStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { FinalCta } from "@/components/home/FinalCta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    title: {
      absolute: t("siteName"),
    },
    description: t("homeDescription"),
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <WorkMarquee />
      <FeaturedWork />
      <ProofStrip />
      <FinalCta />
    </>
  );
}

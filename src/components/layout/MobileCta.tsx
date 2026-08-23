import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { studio } from "@/content/studio";

export function MobileCta() {
  const tNav = useTranslations("nav");
  const tContact = useTranslations("contact");

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-bg/90 p-3 backdrop-blur-md md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <Button href={studio.phoneHref} variant="secondary" className="w-full">
          {tContact("call")}
        </Button>
        <Button href="/contact" className="w-full">
          {tNav("startProject")}
        </Button>
      </div>
    </div>
  );
}

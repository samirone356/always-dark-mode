import { createFileRoute } from "@tanstack/react-router";
import { PageSkeleton } from "@/components/ui/Skeletons";
import { PageShell } from "@/components/layout/PageShell";
import { PageIntro } from "@/components/ui/PageIntro";
import { CtaLink, CtaRow } from "@/components/ui/CtaLink";
import { LottieAside } from "@/components/ui/LottieAside";
import { ExperiencePreview } from "@/components/sections/home/ExperiencePreview";
import { pageSeo, pageTitle } from "@/lib/seo";
import { useI18n } from "@/lib/i18n";

const DESCRIPTION =
  "Professional software engineering experience of Mostafa Samir — .NET 8 Microservices, SignalR IoT telemetry, and multi-tenant marketplace architectures.";

export const Route = createFileRoute("/experience")({
  head: () =>
    pageSeo({ title: pageTitle("Experience"), description: DESCRIPTION, path: "/experience" }),
  pendingComponent: PageSkeleton,
  component: ExperiencePage,
});

function ExperiencePage() {
  const { tr } = useI18n();

  return (
    <PageShell>
      <PageIntro
        eyebrow={tr("experience.page.eyebrow")}
        title={tr("experience.page.title")}
        description={tr("experience.page.desc")}
      />

      <ExperiencePreview />

      <LottieAside src="/lottie/experience-side.json" className="mt-10">
        <CtaRow>
          <CtaLink to="/projects" variant="secondary">
            {tr("skills.page.projectsCta")}
          </CtaLink>
          <CtaLink to="/contact">{tr("about.page.contactCta")}</CtaLink>
        </CtaRow>
      </LottieAside>

    </PageShell>
  );
}

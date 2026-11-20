import { PageContainer } from "@/components/layout/PageContainer";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { Expertise } from "@/components/home/Expertise";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { ClosingCta } from "@/components/home/ClosingCta";
import { experience } from "@/lib/content";

export default function HomePage() {
  return (
    <PageContainer className="flex flex-col gap-4 pt-8 md:pt-12">
      <Hero />
      <Highlights />
      <Expertise />
      <div className="mt-24 empty:hidden">
        <FeaturedProjects />
      </div>
      <ExperienceTimeline items={experience} />
      <ClosingCta />
    </PageContainer>
  );
}

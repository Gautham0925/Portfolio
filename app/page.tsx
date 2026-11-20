import { PageContainer } from "@/components/layout/PageContainer";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";

export default function HomePage() {
  return (
    <PageContainer className="flex flex-col gap-4 pt-8 md:pt-12">
      <Hero />
      <Highlights />
      <div className="mt-20 empty:hidden">
        <FeaturedProjects />
      </div>
    </PageContainer>
  );
}

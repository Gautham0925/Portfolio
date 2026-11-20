import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResumeTabs } from "@/components/resume/ResumeTabs";
import { certifications, education, experience, profile, skills } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
  description: "Experience, education, skills and certifications of Gautham P Kini.",
};

export default function ResumePage() {
  return (
    <PageContainer>
      <SectionHeading as="h1" eyebrow="Resume" title="Experience & credentials" description={profile.tagline} />
      <div className="mt-12">
        <ResumeTabs
          experience={experience}
          education={education}
          skills={skills}
          certifications={certifications}
          profile={profile}
        />
      </div>
    </PageContainer>
  );
}

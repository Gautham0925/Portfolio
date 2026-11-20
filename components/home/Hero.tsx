import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { profile } from "@/lib/content";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grid gap-4 md:grid-cols-3">
      <Card className="relative flex flex-col justify-between gap-10 overflow-hidden p-8 md:col-span-2 md:p-10">
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
        <div className="relative flex flex-col gap-5">
          <p className="eyebrow">{profile.headline}</p>
          <h1 id="hero-title" className="text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{profile.summary}</p>
        </div>
        <div className="relative flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href={site.resumePath} download>
              <FiDownload aria-hidden="true" />
              Download CV
            </a>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/projects">
              View projects
              <FiArrowRight aria-hidden="true" />
            </Link>
          </Button>
          <SocialLinks className="sm:ml-2" />
        </div>
      </Card>
      <Card className="relative min-h-80 overflow-hidden p-0">
        <Image
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          fill
          priority
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
          <p className="font-mono text-xs text-white/80">{profile.tagline}</p>
        </div>
      </Card>
    </section>
  );
}

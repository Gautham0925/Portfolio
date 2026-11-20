import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";

import { HeroSpotlight } from "@/components/home/HeroSpotlight";
import { PhotoRing } from "@/components/home/PhotoRing";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Magnetic } from "@/components/motion/Magnetic";
import { HeroVisual } from "@/components/three/HeroVisual";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { profile } from "@/lib/content";
import { site } from "@/lib/site";

const rise = (delay: number) => ({ animationDelay: `${delay}s` });

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grid gap-4 md:grid-cols-3">
      <Card className="relative flex min-h-[28rem] flex-col justify-between gap-10 overflow-hidden p-8 md:col-span-2 md:min-h-[34rem] md:p-10">
        <div
          aria-hidden="true"
          className="bg-grid animate-rise pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />
        <div className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_30%)] md:opacity-100 md:[mask-image:linear-gradient(to_right,transparent_22%,black_62%)]">
          <HeroVisual />
        </div>
        <HeroSpotlight />
        <div className="relative flex flex-col gap-5">
          <p className="eyebrow animate-rise" style={rise(0.05)}>
            {profile.headline}
          </p>
          <h1 id="hero-title" className="animate-rise text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl" style={rise(0.15)}>
            {profile.name}
          </h1>
          <p className="animate-rise max-w-md text-lg lg:max-w-lg leading-relaxed text-muted" style={rise(0.28)}>
            {profile.summary}
          </p>
        </div>
        <div className="animate-rise relative flex flex-wrap items-center gap-3" style={rise(0.42)}>
          <Magnetic>
            <Button asChild size="lg">
              <a href={site.resumePath} download>
                <FiDownload aria-hidden="true" />
                Download CV
              </a>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="secondary">
              <Link href="/projects">
                View projects
                <FiArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Magnetic>
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
        <PhotoRing />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
          <p className="font-mono text-xs text-white/80">{profile.tagline}</p>
        </div>
      </Card>
    </section>
  );
}

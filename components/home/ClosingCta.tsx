import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { profile } from "@/lib/content";
import { CopyEmail } from "./CopyEmail";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="mt-24">
      <Reveal>
        <Card className="relative overflow-hidden p-8 md:p-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-accent-soft blur-3xl" />
          <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_65%)]" aria-hidden="true" />
          <div className="relative flex max-w-2xl flex-col gap-6">
            <p className="eyebrow">Contact</p>
            <h2 id="cta-title" className="text-3xl font-semibold md:text-5xl">
              Have a security question or an opportunity?
            </h2>
            <p className="text-lg leading-relaxed text-muted">Send a message and I will get back to you.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Get in touch
                    <FiArrowRight aria-hidden="true" />
                  </Link>
                </Button>
              </Magnetic>
              <CopyEmail email={profile.contact.email} />
            </div>
          </div>
        </Card>
      </Reveal>
    </section>
  );
}

import type { Metadata } from "next";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

import { PageContainer } from "@/components/layout/PageContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Gautham P Kini.",
};

const details = [
  { icon: FiMail, label: "Email", value: profile.contact.email, href: `mailto:${profile.contact.email}` },
  { icon: FiPhone, label: "Phone", value: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s/g, "")}` },
  { icon: FiMapPin, label: "Location", value: profile.contact.location },
];

export default function ContactPage() {
  return (
    <PageContainer>
      <SectionHeading
        as="h1"
        eyebrow="Contact"
        title="Let's talk"
        description="Questions about my work, a security project or an opportunity — send a message."
      />
      <div className="mt-12 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Card className="p-6 md:p-8">
          <h2 className="sr-only">Contact form</h2>
          <ContactForm />
        </Card>
        <div className="flex flex-col gap-4">
          <h2 className="sr-only">Contact details</h2>
          {details.map(({ icon: Icon, label, value, href }) => (
            <Card key={label} className="flex items-center gap-4">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-text">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-wider text-subtle">{label}</p>
                {href ? (
                  <a href={href} className="break-words hover:text-accent-text">
                    {value}
                  </a>
                ) : (
                  <p className="break-words">{value}</p>
                )}
              </div>
            </Card>
          ))}
          <Card className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-wider text-subtle">Elsewhere</p>
            <SocialLinks />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

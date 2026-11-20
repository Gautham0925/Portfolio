"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ContactInfo = {
  icon: ReactNode;
  title: string;
  description: string;
};

const info: readonly ContactInfo[] = [
  { icon: <FaPhoneAlt aria-hidden="true" />, title: "Phone", description: "+91 6282259552" },
  { icon: <FaEnvelope aria-hidden="true" />, title: "Email", description: "gautham07049@gmail.com" },
  { icon: <FaMapMarkerAlt aria-hidden="true" />, title: "Address", description: "Moodbidri, Dakshina Kannada 574227" },
];

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz9jMg3-sCsYEqvfyphaUdzQEEtZZaop1gN4Xt_0K73l9dUUchnIqxyKWCwpbWJW5fORQ/exec";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "success" } | { kind: "error"; message: string };

const Contact = () => {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus({ kind: "sending" });

    try {
      const response = await fetch(SCRIPT_URL, { method: "POST", body: new FormData(form) });
      if (!response.ok) {
        setStatus({ kind: "error", message: "Failed to send message." });
        return;
      }
      form.reset();
      setStatus({ kind: "success" });
      setTimeout(() => setStatus({ kind: "idle" }), 3000);
    } catch {
      setStatus({ kind: "error", message: "Error sending message." });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:w-[54%] order-2 xl:order-none">
            <form
              className="flex flex-col gap-6 p-16 bg-[#27272c] rounded-xl"
              name="submit-to-google-sheet"
              onSubmit={handleSubmit}
              aria-describedby="form-status"
            >
              <h1 className="text-4xl text-accent">Contact me</h1>
              <p className="text-white/60">Fill up the following details to contact me</p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Input type="text" name="firstname" placeholder="Name" aria-label="First name" autoComplete="given-name" maxLength={80} required />
                <Input type="text" name="lastname" placeholder="Lastname" aria-label="Last name" autoComplete="family-name" maxLength={80} required />
                <Input type="email" name="email" placeholder="Email address" aria-label="Email address" autoComplete="email" maxLength={254} required />
                <Input type="tel" name="phone" placeholder="Phone Number" aria-label="Phone number" autoComplete="tel" maxLength={20} required />
              </div>

              <Textarea className="h-[200px]" name="Message" placeholder="Type your message here." aria-label="Message" maxLength={2000} required />

              <Button size="md" className="max-w-40" type="submit" disabled={status.kind === "sending"}>
                {status.kind === "sending" ? "Sending…" : "Send message"}
              </Button>
            </form>

            <p
              id="form-status"
              role="status"
              aria-live="polite"
              className={`mt-4 ${status.kind === "error" ? "text-red-400" : "text-green-500"}`}
            >
              {status.kind === "success" && "Message sent successfully!"}
              {status.kind === "error" && status.message}
            </p>
          </div>

          <div className="flex items-center flex-1 order-1 mb-8 xl:justify-end xl:order-none xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item) => (
                <li key={item.title} className="flex items-center gap-6">
                  <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-xl flex items-center justify-center">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60">{item.title}</p>
                    <p className="text-xl">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Image from "next/image";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import WorkSliderBtns from "@/components/WorkSliderBtns";

type Project = {
  num: string;
  category: string;
  title: string;
  description: string;
  stack: { name: string }[];
  image: string;
  live: string;
  github: string;
};

const works: Project[] = [
    {
        num: '01',
        category: 'Cryptography Tools',
        title: 'Caesar Cipher Web Tool',
        description: 'Web-based Caesar cipher encryption and decryption tool.',
        stack: [{ name: "Python" }, { name: "Flask" }],
        image: '/assets/work/caesar-cipher.png',
        live: "https://demo-hkyx.onrender.com/caesar_cipher",
        github: 'https://github.com/Gautham0925/Prodigi-CyberSecurity'
    },
    {
        num: '02',
        category: 'Security Tools',
        title: 'Password Strength Checker',
        description: 'Tool to check password strength and guide users to create stronger passwords.',
        stack: [{ name: "Python" }, { name: "Flask" }],
        image: '/assets/work/password-checker.png',
        live: "https://demo-hkyx.onrender.com/password_checker",
        github: 'https://github.com/Gautham0925/Prodigi-CyberSecurity'
    },
    {
        num: '03',
        category: 'Cryptography Tools',
        title: 'Image Encryption & Decryption Tool',
        description: 'Python tool to securely encrypt and decrypt images.',
        stack: [{ name: "Python" }, { name: "Flask" }, { name: "Cryptography" }],
        image: '/assets/work/image-encryption.png',
        live: "https://demo-hkyx.onrender.com/image_encryption",
        github: 'https://github.com/Gautham0925/Prodigi-CyberSecurity'
    },
    {
        num: '04',
        category: 'Monitoring Tools',
        title: 'Keylogger',
        description: 'Educational keylogger project demonstrating how keystrokes can be captured and logged locally.',
        stack: [{ name: "Python" }],
        image: '/assets/work/keylogger.png',
        live: "https://demo-hkyx.onrender.com/keylogger",
        github: 'https://github.com/Gautham0925/Prodigi-CyberSecurity'
    },
    {
        num: '05',
        category: 'Network Security',
        title: 'Network Traffic Analyzer / Packet Sniffer',
        description: 'Python-based tool to sniff, capture, and display network packets.',
        stack: [{ name: "Python" }, { name: "Scapy" }],
        image: '/assets/work/packet-sniffer.png',
        live: "https://demo-hkyx.onrender.com/packet_sniffer",
        github: 'https://github.com/Gautham0925/Prodigi-CyberSecurity'
    }
]

const Projects = () => {
  const [work, setWork] = useState<Project>(works[0]!);

  const handleSlideChange = (swiper: SwiperInstance) => {
    const next = works[swiper.activeIndex];
    if (next) setWork(next);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex flex-col py-12 justify-center xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div
                className="font-extrabold leading-none text-transparent text-8xl"
                style={{ WebkitTextStroke: "2px white" }}
                aria-hidden="true"
              >
                {work.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white transition-all duration-500 capitalize">
                {work.category} project
              </h2>
              <h3 className="sr-only">{work.title}</h3>
              <p className="text-white/60">{work.description}</p>
              <ul className="flex gap-4">
                {work.stack.map((item, index) => (
                  <li key={item.name} className="text-xl text-accent">
                    {item.name}
                    {index !== work.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20" />
              <div className="flex items-center gap-4">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={work.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Live demo: ${work.title}`}
                        className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <BsArrowUpRight className="text-3xl text-white group-hover:text-accent" aria-hidden="true" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live Project</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={work.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`GitHub repository: ${work.title}`}
                        className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        <BsGithub className="text-3xl text-white group-hover:text-accent" aria-hidden="true" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github repository</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper spaceBetween={30} slidesPerView={1} className="h-[520px] mb-12" onSlideChange={handleSlideChange}>
              {works.map((project) => (
                <SwiperSlide key={project.num} className="w-full">
                  <div className="h-[460px] relative group justify-center flex items-center">
                    <div className="absolute top-0 bottom-0 z-10 w-full h-full bg-black/10" />
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        fill
                        sizes="(min-width: 1200px) 50vw, 100vw"
                        className="object-cover"
                        alt={`Screenshot of ${project.title}`}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;

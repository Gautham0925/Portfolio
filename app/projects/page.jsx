"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

import { BsArrowUpRight, BsGithub } from 'react-icons/bs';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const works = [
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
    const [work, setProjects] = useState(works[0]);

    const handleSlideChange = (swiper) => {
        //get current slide index
        const currentIndex = swiper.activeIndex;
        //update work state index based on current slide index
        setProjects(works[currentIndex])
    }


    return (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }} className="min-h-[80vh] flex flex-col py-12 justify-center xl:px-0">
            <div className="container mx-auto">
                <div className="flex flex-col xl:flex-row xl:gap-[30px]">
                    <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
                        <div className="flex flex-col gap-[30px] h-[50%]">
                            {/* outline num */}
                            <div className="font-extrabold leading-none text-transparent text-8xl text-outline" style={{
                                WebkitTextStroke: '2px white', // Adjust thickness and color
                                textStroke: '2px white',
                                color: 'transparent'
                            }}>{work.num}</div>

                            {/* project category */}
                            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">{work.category} project
                            </h2>
                            {/* project description */}
                            <p className="text-white/60 ">{work.description}</p>
                            {/* stack */}
                            <ul className="flex gap-4">
                                {work.stack.map((item, index) => {
                                    return <li key={index} className="text-xl text-accent ">{item.name}
                                        {/* remove the last comma */}
                                        {index !== work.stack.length - 1 && ","}</li>
                                })}
                            </ul>
                            { /* border*/}
                            <div className="border border-white/20"></div>

                            { /* buttons*/}
                            <div className="flex items-center gap-4">
                                { /* live project button*/}
                                <Link href={work.live}>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group ">
                                                <BsArrowUpRight className="text-3xl text-white group-hover:text-accent" />
                                            </TooltipTrigger>
                                            <TooltipContent >
                                                <p>Live Project</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                                { /* Github project button*/}
                                <Link href={work.github}>
                                    <TooltipProvider delayDuration={100}>
                                        <Tooltip>
                                            <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group ">
                                                <BsGithub className="text-3xl text-white group-hover:text-accent" />
                                            </TooltipTrigger>
                                            <TooltipContent >
                                                <p >Github repository</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-full xl:w-[50%]">
                        <Swiper spaceBetween={30} slidesPerView={1} className="h-[520px] mb-12" onSlideChange={handleSlideChange}>
                            {works.map((project, index) => {
                                return <SwiperSlide key={index} className="w-full">
                                    <div className="h-[460px] relative group justify-center flex items-center">
                                        { /* overlay*/}
                                        <div className="absolute top-0 bottom-0 z-10 w-full h-full bg-black/10"></div>
                                        { /* image*/}
                                        <div className="relative w-full h-full ">
                                            <Image src={project.image} fill className="object-cover " alt="" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })}
                            { /* slider buttons*/}
                            <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none " btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" />
                        </Swiper>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}

export default Projects

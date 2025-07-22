"use client";

import { FaPython, FaJs, FaJava, FaCuttlefish, FaLinux, FaWindows, FaAndroid } from "react-icons/fa";
import { SiWireshark, SiVirtualbox } from "react-icons/si";
import { RiBugLine, RiComputerLine } from "react-icons/ri"; // used for BurpSuite and Nmap
import 'swiper/css';

//about data
const about = {
    title: 'About me',
    description: 'Building safer systems through code and creativity.',
    info: [
        {
            fieldName: "Name",
            fieldValue: "Gautham P Kini"
        },
        {
            fieldName: "Phone number",
            fieldValue: "+916282259552"
        },
        {
            fieldName: "gmail",
            fieldValue: "gautham07049@gmail.com"
        },
        {
            fieldName: "Experience",
            fieldValue: "Fresher"
        },
        {
            fieldName: "Nationality",
            fieldValue: "Indian"
        },
        {
            fieldName: "Languages Known",
            fieldValue: "English, Konkani, Kannada, Hindi, Malayalam, Tulu"
        },
    ]
};

const experience = {
    icon: "/public/assets/resume/icons/badge.svg",
    title: "My Experience",
    description: "Internships and projects in cybersecurity.",
    items: [
        {
            company: "Cyber Cell (Internship)",
            position: "Cybersecurity Intern",
            duration: "May/2025 - Present"
        },
        {
            company: "Prodigy Info Tech",
            position: "Python Developer Intern",
            duration: "Jan/2025 - Mar/2025"
        },
        {
            company: "Blockchain & DID Research Project",
            position: "Researcher & Developer",
            duration: "Feb/2025 - Present"
        }
    ]
};


//education data
const education = {
    icon: "/public/assets/resume/icons/cap.svg",
    title: "My Education",
    description: "Currently pursuing my Bachelor of Engineering degree in Computer Science(IoT,Cybersecurity including blockchain)",
    items: [
        {
            institution: "Alvas Institute of Engineering and Technology, Moodbidri",
            degree: "B.E. CSE(IoT,Cybersecurity \n including Blockchain)",
            duration: "2022-Present"

        },
        {
            institution: "B.E.M.H.S.S, Kasaragod",
            degree: "+2 (puc equivalent)",
            duration: "2020-2022"

        },
        {
            institution: "B.E.M.H.S.S, Kasaragod",
            degree: "sslc",
            duration: "2017-2020"

        },
    ]
}

//skills data
const skills = {
    title: "My Skills",
    description: "Technical skills, tools, and operating systems learned through projects, internships, and research.",
    skillsList: [
        // Programming Languages
        {
            group: "Programming Languages",
            items: [
                {
                    icon: <FaCuttlefish />,  // closest for 'C'
                    name: "C"
                },
                {
                    icon: <FaPython />,
                    name: "Python"
                },
                {
                    icon: <FaJs />,
                    name: "JavaScript"
                }
            ]
        },
        // Cybersecurity & Networking Tools
        {
            group: "Cybersecurity & Networking Tools",
            items: [
                {
                    icon: <RiComputerLine />,
                    name: "Nmap"
                },
                {
                    icon: <SiWireshark />,
                    name: "Wireshark"
                },
                {
                    icon: <RiBugLine />,
                    name: "Burp Suite"
                },
                {
                    icon: <SiVirtualbox />,
                    name: "VirtualBox / VM"
                }
            ]
        },
        // Operating Systems
        {
            group: "Operating Systems",
            items: [
                {
                    icon: <FaLinux />,
                    name: "Kali Linux"
                },
                {
                    icon: <FaWindows />,
                    name: "Windows"
                },
                {
                    icon: <FaAndroid />,
                    name: "Android"
                }
            ]
        }
    ]
};

// Certifications data grouped by platform
const certifications = [
  {
    platform: "NPTEL",
    items: [
      {
        name: "Introduction to Internet of Things",
        date: "2024",
        image: "/assets/certificates/NPTEL/iot.png"
      },
      {
        name: "Programming in Java",
        date: "2024",
        image: "/assets/certificates/NPTEL/java.png"
      },
      // Add more NPTEL certificates here
    ]
  },
  {
    platform: "Coursera",
    items: [
      {
        name: "Google Cybersecurity",
        date: "2024",
        image: "/assets/certificates/Coursera/google-cybersecurity.png"
      },
      // Add more Coursera certificates here
    ]
  },
  {
    platform: "Cisco",
    items: [
      {
        name: "Introduction to Cybersecurity",
        date: "2024",
        image: "/assets/certificates/cisco/cisco-introcyber.png"
      },
      {
        name: "Ethical Hacker",
        date: "2024",
        image: "/assets/certificates/cisco/Ethicalhacker.png"
      },
      {
        name: "Introduction to IoT and Digital Transformation",
        date: "2024",
        image: "/assets/certificates/cisco/IoT.png"
      },
      {
        name: "Linux Unhatched",
        date: "2024",
        image: "/assets/certificates/cisco/linux.png"
      },
      {
        name: "Networking Basics",
        date: "2024",
        image: "/assets/certificates/cisco/networking.png"
      },
      // Add more Cisco certificates here
    ]
  },
  {
    platform: "CYBRARY",
    items: [
      {
        name: "DevSecOps",
        date: "2025",
        image: "/assets/certificates/Cybrary/1.png"
      },
      {
        name: "Network Basics",
        date: "2025",
        image: "/assets/certificates/Cybrary/2.png"
      },
      {
        name: "IP Addressing Basics",
        date: "2025",
        image: "/assets/certificates/Cybrary/3.png"
      },
      {
        name: "Network Reference Models",
        date: "2025",
        image: "/assets/certificates/Cybrary/4.png"
      },
      // Add more CYBRARY certificates here
    ]
  },
  {
    platform: "Forage",
    items: [
      {
        name: "Cybersecurity Job Simulation",
        date: "2024",
        image: "/assets/certificates/Forage/Mastercard.png"
      },
      {
        name: "Cybersecurity	Analyst	Job	Simulation",
        date: "2025",
        image: "/assets/certificates/Forage/TATA.png"
      },
      // Add more Forage certificates here
    ]
  },
];

//components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import WorkSliderBtns from "@/components/WorkSliderBtns";




function Resume() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
        className="min-h-[80vh] flex justify-center items-center py-12 xl:py-0"
      >
        <div className="container mx-auto">
          <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
            <TabsList className="flex flex-col w-full max-w-[380px] max-h-[600px] mx-auto xl:mx-0 gap-6">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="about">About me</TabsTrigger>
            </TabsList>
  
            {/* Contents container */}
            <div className="w-full relative min-h-[650px]"> {/* adjust min-h as needed */}
  
              {/* Experience */}
              <TabsContent value="experience" className="absolute inset-0 w-full min-h-full transition-opacity duration-500">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{experience.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                  <ScrollArea className="min-h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {experience.items.map((item, index) => (
                        <li key={index} className="bg-secondary min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-start gap-1">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[350px] min-h-[60px]">{item.position}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>
  
              {/* Education */}
              <TabsContent value="education" className="absolute inset-0 w-full min-h-full transition-opacity duration-500">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{education.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                  <ScrollArea className="min-h-[400px]">
                    <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                      {education.items.map((item, index) => (
                        <li key={index} className="bg-secondary min-h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-start gap-1">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[350px] min-h-[60px]">{item.degree}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </TabsContent>
  
              {/* Skills */}
              <TabsContent value="skills" className="absolute inset-0 w-full min-h-full transition-opacity duration-500">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                  <div className="flex flex-col gap-8">
                    {skills.skillsList.map((group, groupIndex) => (
                      <div key={groupIndex} className="flex flex-col gap-4">
                        <h4 className="text-2xl font-semibold text-accent">{group.group}</h4>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                          {group.items.map((skill, skillIndex) => (
                            <li key={skillIndex}>
                              <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger className="w-full min-h-[120px] bg-secondary rounded-xl flex justify-center items-center group card-hover">
                                    <div className="text-4xl transition-all duration-300 group-hover:text-accent">
                                      {skill.icon}
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="capitalize">{skill.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
  
              {/* Certifications */}
              <TabsContent value="certifications" className="absolute inset-0 w-full min-h-full transition-opacity duration-500">
                <div className="flex flex-col gap-[30px] text-center xl:text-left items-start">
                  <h3 className="text-4xl font-bold w-full mb-6 xl:ml-16">Certifications</h3>
                  <div className="w-full xl:w-[90%] mx-auto">
                    <Swiper spaceBetween={30} slidesPerView={1} className="h-[520px] mb-12 xl:mb-0">
                      {certifications.map((platform, idx) => (
                        <SwiperSlide key={idx}>
                          <div className="flex flex-col items-center">
                            <h4 className="text-3xl font-bold text-accent mb-8">{platform.platform}</h4>
                            <ScrollArea className="w-full h-[400px]">
                              <div className="grid grid-cols-1 gap-6 w-full pr-4">
                                {platform.items.map((cert, certIdx) => (
                                  <div key={certIdx} className="flex flex-row items-center bg-secondary rounded-xl p-6 shadow-lg gap-6">
                                    <div className="relative w-[500px] h-[350px] rounded-lg overflow-hidden border-2 border-accent flex-shrink-0">
                                      <img src={cert.image} alt={cert.name} className="object-cover w-full h-full" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                      <h5 className="text-2xl font-semibold text-white mb-3">{cert.name}</h5>
                                      <p className="text-white/70 text-lg">Issued: {cert.date}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </ScrollArea>
                          </div>
                        </SwiperSlide>
                      ))}
                      <WorkSliderBtns containerStyles="flex gap-2 absolute right-0 bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none " btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all" />
                    </Swiper>
                  </div>
                </div>
              </TabsContent>
  
              {/* About */}
              <TabsContent value="about" className="absolute inset-0 w-full min-h-full transition-opacity duration-500">
                <div className="flex flex-col gap-[30px] items-center xl:items-start xl:pl-0 xl:pr-auto xl:ml-0 xl:w-[70%]">
                  <h3 className="text-4xl font-bold gradient-text mb-2">{about.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 mb-4">{about.description}</p>
                  <div className="w-full max-w-xl bg-secondary/80 rounded-2xl shadow-lg p-8 flex flex-col gap-0 items-start">
                    <div className="mb-6 w-full">
                      <span className="text-3xl font-extrabold text-accent block text-left">{about.info[0].fieldValue}</span>
                    </div>
                    {about.info.slice(1).map((item, idx) => (
                      <div key={idx} className="w-full flex flex-col items-start">
                        <span className="text-accent text-lg font-semibold text-left">{item.fieldName}</span>
                        <span className="text-white text-xl mb-2 text-left">{item.fieldValue}</span>
                        {idx !== about.info.slice(1).length - 1 && (
                          <div className="w-2/3 h-px bg-accent/30 my-2"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
  
            </div> {/* end of contents container */}
          </Tabs>
        </div>
      </motion.div>
    );
  }

export default Resume

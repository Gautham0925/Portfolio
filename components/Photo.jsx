'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Photo = () => {
    return (
        <div className='relative w-full h-full'> {/* Keeps the circle and photo contained */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 1,
                    transition: {
                        delay: 2,
                        duration: 0.4,
                        ease: 'easeIn'
                    }
                }}
            >
                {/* Image */}
                <div className="relative w-[298px] h-[298px] xl:w-[400px] xl:h-[400px]"> {/* Fixed size container */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                delay: 2.4,
                                duration: 0.4,
                                ease: 'easeInOut'
                            }
                        }}
                        className='absolute inset-0 mix-blend-lighten' // inset-0 positions absolutely within parent
                    >
                        <Image src="/assets/photo.png" priority quality={100} fill alt='' className="object-contain" />
                    </motion.div>
                </div>
                {/* Circle */}
                <motion.svg
                    className="absolute inset-0" // absolute and inset-0 centers the circle
                    fill="transparent"
                    viewBox={`0 0 506 506`}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <motion.circle
                        cx="253"
                        cy="253"
                        r="250"
                        stroke="#8a2be2"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ strokeDasharray: "24 10 0 0" }}
                        animate={{
                            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                            rotate: [120, 360]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            repeatType: "reverse",
                        }}
                    />
                </motion.svg>
            </motion.div>
        </div>
    );
}

export default Photo
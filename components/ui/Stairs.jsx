import { animate, motion } from "framer-motion";

//variants
var stairAnimation = {
    intial: {
        top: "0%"
    },
    animate: {
        top: "100%"
    },
    exit: {
        top: ["100%", "0%"]
    }

}

//calculate the reverse index for staggered delay
const reverseIndex = (index) => {
    //total steps
    const totalSteps = 6;
    return totalSteps - index - 1;
}

const Stairs = () => {
    return (
        <>
            {[...Array(6)].map((_, index) => {
                return (<motion.div key={index} variants={stairAnimation} initial="initial" animate="animate" exit="exit" transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    delay: reverseIndex(index) * 0.1
                }}
                    className="relative w-full h-full bg-white">

                </motion.div>);
            })}
        </>
    )
}

export default Stairs
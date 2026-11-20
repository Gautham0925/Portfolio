"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";

type WorkSliderBtnsProps = {
  containerStyles?: string;
  btnStyles?: string;
  iconStyles?: string;
};

const WorkSliderBtns = ({ containerStyles, btnStyles, iconStyles }: WorkSliderBtnsProps) => {
  const swiper = useSwiper();

  return (
    <div className={containerStyles}>
      <button type="button" aria-label="Previous slide" className={btnStyles} onClick={() => swiper.slidePrev()}>
        <PiCaretLeftBold className={iconStyles} aria-hidden="true" />
      </button>
      <button type="button" aria-label="Next slide" className={btnStyles} onClick={() => swiper.slideNext()}>
        <PiCaretRightBold className={iconStyles} aria-hidden="true" />
      </button>
    </div>
  );
};

export default WorkSliderBtns;

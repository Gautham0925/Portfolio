import type { ReactNode } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

type SocialLink = {
  label: string;
  icon: ReactNode;
  path: string;
};

const socials: readonly SocialLink[] = [
  { label: "GitHub", icon: <FaGithub aria-hidden="true" />, path: "https://github.com/gautham0925" },
  {
    label: "LinkedIn",
    icon: <FaLinkedinIn aria-hidden="true" />,
    path: "https://www.linkedin.com/in/gautham-p-k-62aa68291/",
  },
];

type SocialProps = {
  containerStyles?: string;
  iconStyles?: string;
};

const Social = ({ containerStyles, iconStyles }: SocialProps) => {
  return (
    <div className={containerStyles}>
      {socials.map((item) => (
        <a
          key={item.path}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={iconStyles}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default Social;

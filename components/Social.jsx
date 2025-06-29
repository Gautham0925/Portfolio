import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';


const socials = [
    { icon: <FaGithub />, path: 'https://github.com/gautham0925' },
    { icon: <FaLinkedinIn />, path: 'https://www.linkedin.com/in/gautham-p-k-62aa68291/' },
]


const Social = ({ containerStyles, iconStyles }) => {
    return (
        <div className={containerStyles}>{socials.map((item, index) => {
            return <Link key={index} href={item.path} className={iconStyles} >
                {item.icon}
            </Link>
        })}</div>
    )
}

export default Social

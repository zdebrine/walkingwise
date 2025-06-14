import React from "react";
import Link from "next/link";
import { roboto ,robotoop ,robotoopo } from "../public/fonts/Fonts";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { SiTiktok } from "react-icons/si"; // TikTok from Simple Icons

const Footer = () => {
  const socialIcons = [FaFacebook, FaYoutube, FaInstagram, FaLinkedin, SiTiktok];
  return (
    <div className="bg-[#BFEBF0] py-10 w-full">
      {/* Main Footer Content */}
      <div className="flex flex-col max-w-screen-2xl mx-auto md:flex-row flex-wrap justify-evenly items-start px-4 sm:px-8 lg:px-10  gap-8">
        {/* Report Section */}
        <div className="w-full md:w-1/2 lg:w-1/3 min-w-[250px] px-4">
          <p className={`${roboto.className} mt-5 text-xl text-red-500`}>
            Report Suspicions of Human Trafficking to:
          </p>
          <p className={`${roboto.className} mt-3 text-[#303030] text-2xl`}>
            National Human Trafficking Hotline
          </p>
          <p className={`${robotoopo.className} mt-2 text-[#303030] text-lg sm:text-xl`}>
            Send a Text to 233733 (BEFREE); 1-888-373-7888
          </p>
          <p className={`${robotoop.className} mt-2 text-[#73c4cd] text-xl sm:text-2xl`}>
            Rescue America
          </p>
          <p className={`${robotoop.className} mt-2 text-[#73c4cd] text-xl sm:text-2xl`}>
            833-599-FREE (3733)
          </p>
        </div>
        {[
          [
            { label: "Home", href: "/" },
            { label: "About us", href: "/about" },
            { label: "Pricing", href: "/" },
            { label: "Demo", href: "/demo" },
            { label: "Enroll", href: "/" },
          ],
          [
            { label: "Youth Curriculum", href: "/youth-curriculum" },
            { label: "Animated Videos", href: "/videos" },
            { label: "Adult Education", href: "/adult-education" },
            { label: "Online Course", href: "/course" },
            { label: "CME Accreditation", href: "/contact-us" },
          ],
          [
            { label: "School Programs", href: "/school-programs" },
            { label: "Youth Organization", href: "/youth-organization" },
            { label: "Implementation", href: "/implementation" },
            { label: "Home Education", href: "/home-education" },
          ],
          [
            { label: "Login", href: "/" },
            { label: "My Account", href: "/" },
            { label: "Contact Us", href: "/contact" },
            { label: "Terms of Use", href: "/" },
            { label: "Privacy Policy", href: "/" },
          ]
        ].map((column, index) => (
          <div key={index} className="flex flex-col min-w-[150px] px-4">
            {column.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`${robotoopo.className} text-lg sm:text-xl text-[#303030]  hover:text-[#05AFDB] cursor-pointer`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full flex max-w-screen-2xl mx-auto flex-col sm:flex-row justify-between items-center px-4 sm:px-8 lg:px-20  gap-4">
        <p className={`${robotoop.className} text-[#303030] text-base `}>
          ©2025 Walking Wise. All Rights Reserved.
        </p>
<div className="flex gap-1 p-1 bg-[#006072] ">
  {socialIcons.map((Icon, index) => (
    <div
      key={index}
      className="w-10 h-10 bg-[#5FCEE9] flex items-center justify-center cursor-pointer hover:opacity-80"
    >
      <Icon className="text-white w-5 h-5 " />
    </div>
  ))}
</div>
        

      </div>
    </div>
  );
};

export default Footer;

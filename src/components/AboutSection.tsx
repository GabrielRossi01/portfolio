"use client";

import { motion } from 'framer-motion';
import { Users, Clock, Github, Linkedin } from 'lucide-react';
import Earth3D from './Earth3D';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  // Front-end Technologies
  const frontendTech = [
    {
      name: "React",
      icon: (
        <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#61DAFB]">
          <circle cx="0" cy="0" r="2" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1" fill="none">
            <ellipse rx="10" ry="4.5" />
            <ellipse rx="10" ry="4.5" transform="rotate(60)" />
            <ellipse rx="10" ry="4.5" transform="rotate(120)" />
          </g>
        </svg>
      )
    },
    {
      name: "Next.js",
      icon: (
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <mask id="mask0_next" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#mask0_next)">
            <circle cx="90" cy="90" r="90" fill="currentColor" className="text-black dark:text-white" />
            <path d="M149.508 157.527V69.111H130.373L66.7908 158.621C75.9766 163.698 86.5018 166.168 97.0425 165.94C116.88 165.51 135.633 158.288 149.508 157.527ZM22.2513 118.817V89.111H41.3861V161.732C31.5434 148.98 25.1052 134.456 22.2513 118.817ZM41.3861 69.111V69.111L41.3861 69.111Z" fill="white" className="fill-white dark:fill-black" />
          </g>
        </svg>
      )
    },
    {
      name: "Tailwind",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#06B6D4]">
          <path d="M12.0001 13C10.6668 13 10.0001 12.3333 10.0001 11C10.0001 9 12.0001 8.33333 12.0001 6.5C12.0001 5.16667 11.3335 4.5 10.0001 4.5C8.00013 4.5 7.00013 5.5 5.50013 7.5L4.00013 6.5C5.50013 4 7.50013 2.5 10.0001 2.5C12.6668 2.5 14.0001 3.83333 14.0001 6.5C14.0001 8.5 12.0001 9.16667 12.0001 11C12.0001 12.3333 12.6668 13 14.0001 13C16.0001 13 17.0001 12 18.5001 10L20.0001 11C18.5001 13.5 16.5001 15 14.0001 15C11.3335 15 10.0001 13.6667 10.0001 11H12.0001V13ZM7.00013 16C7.00013 14.6667 7.6668 14 9.00013 14C11.0001 14 12.0001 13 13.5001 11L15.0001 12C13.5001 14.5 11.5001 16 9.00013 16C6.33346 16 5.00013 14.6667 5.00013 12H7.00013C7.00013 14 5.00013 14.6667 5.00013 16.5C5.00013 17.8333 5.6668 18.5 7.00013 18.5C9.00013 18.5 10.0001 17.5 11.5001 15.5L13.0001 16.5C11.5001 19 9.50013 20.5 7.00013 20.5C4.33346 20.5 3.00013 19.1667 3.00013 16.5C3.00013 14.5 5.00013 13.8333 5.00013 12H7.00013V16Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "TypeScript",
      icon: (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path d="M72.2 96.6H58.4V48.5H35.8V37.7H94.7V48.5H72.2V96.6ZM94.2 82.1C94.2 86 96.1 86.8 99.4 86.8C101.4 86.8 103 86.6 103.8 86.3L103.8 96.6C102.1 97.2 98.8 97.7 94.6 97.7C86.7 97.7 81.3 93.3 81.3 83.4C81.3 75.6 86.6 71.3 92.8 68.8L97.4 67.2C101.9 65.5 103 63.8 103 61.2C103 58.1 100.9 56.4 97.3 56.4C93.4 56.4 90.7 58.1 88.5 61.2L78.6 54.8C82.4 48.9 88.5 45.6 97.6 45.6C108.6 45.6 116.1 51.6 116.1 61.9C116.1 70.8 110.6 75 104.9 77.2L99.9 79.1C96.1 80.6 94.2 82.2 94.2 82.1Z" fill="white" />
        </svg>
      )
    },
    {
      name: "HTML",
      icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#E34F26]">
          <path d="M71.357 460.819L31.885 25.541H480.115L440.643 460.819L255.828 512L71.357 460.819Z" fill="currentColor" />
          <path d="M410.635 70.133H101.72L133.497 426.65L256.002 460.613L378.502 426.65L410.635 70.133Z" fill="#EF652A" />
          <path d="M256 195.955V113.88H155.39L161.465 181.87H256V195.955ZM256 322.164L255.828 322.21L209.689 309.73L206.568 274.793H178.696L183.744 331.275L255.828 351.275L256 351.226V322.164Z" fill="white" />
          <path d="M256.002 113.88V195.953H345.992L337.037 296.064L256.002 318.52V351.223L363.832 321.433L376.682 113.88H256.002Z" fill="white" />
        </svg>
      )
    },
    {
      name: "CSS",
      icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#1572B6]">
          <path d="M71.357 460.819L31.885 25.541H480.115L440.643 460.819L255.828 512L71.357 460.819Z" fill="currentColor" />
          <path d="M410.635 70.133H101.72L133.497 426.65L256.002 460.613L378.502 426.65L410.635 70.133Z" fill="#33A9DC" />
          <path d="M256.002 195.842V113.88H155.39L161.465 181.867H256.002V195.842ZM256.002 322.164L255.828 322.21L209.689 309.73L206.568 274.793H178.696L183.744 331.275L255.828 351.275L256.002 351.226V322.164Z" fill="white" />
          <path d="M256.002 113.88V195.84H346.035L337.035 296.064L256.002 318.52V351.223L363.832 321.433L376.682 113.88H256.002Z" fill="white" />
        </svg>
      )
    },
  ];

  // Back-end & Database Technologies
  const backendTech = [
    {
      name: "Node.js",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#339933]">
          <path d="M16 0L29.856 8V24L16 32L2.144 24V8L16 0ZM24 14.5L16.5 10.2V5.7L24 10V14.5ZM15.5 5.7V10.2L8 14.5V10L15.5 5.7ZM7.5 15.4L15.5 20V29.1L7.5 24.5V15.4ZM16.5 29.1V20L24.5 15.4V24.5L16.5 29.1Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Python",
      icon: (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M63.2 10.9C43.1 10.9 33.7 20 33.7 33.7V41.3H49.3V34.5C49.3 27.2 55.4 25.6 63.6 25.6C71.3 25.6 77.2 26.6 77.2 33.7C77.2 39.7 72.8 42.1 63.3 42.1H48.2C27.9 42.1 16 54.2 16 75.1V80.3C16 99.4 28.5 111.9 48.7 111.9H64.7C84.8 111.9 94.2 102.8 94.2 89.1V81.4H78.7V88.3C78.7 95.6 72.5 97.2 64.3 97.2C56.6 97.2 50.7 96.2 50.7 89.1C50.7 83.1 55.1 80.7 64.6 80.7H79.7C100 80.7 111.9 68.6 111.9 47.7V42.5C111.8 23.4 99.3 10.9 63.2 10.9ZM44.1 27.1C46.8 27.1 49 29.3 49 32C49 34.7 46.8 36.9 44.1 36.9C41.4 36.9 39.2 34.7 39.2 32C39.2 29.3 41.4 27.1 44.1 27.1ZM83.8 85.9C81.1 85.9 78.9 88.1 78.9 90.8C78.9 93.5 81.1 95.7 83.8 95.7C86.5 95.7 88.7 93.5 88.7 90.8C88.7 88.1 86.5 85.9 83.8 85.9Z" fill="url(#python_gradient)"/>
          <defs>
            <linearGradient id="python_gradient" x1="16" y1="10.9" x2="111.9" y2="111.9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3776AB"/>
              <stop offset="1" stopColor="#FFD343"/>
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      name: "Java",
      icon: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#5382A1]">
          <path d="M26.3 16.5C26 15.1 25.1 13.9 23.9 13.1C24.4 12.1 24.8 11.2 24.8 11.2C24.8 11.2 22.3 12.3 20.3 13.1C20.3 13.1 19.3 9.4 15.8 8C14.1 7.3 11.3 7 11.3 7C11.3 7 13.1 8.8 13.3 11.3C13.5 13.6 11.7 15.6 11.7 15.6C11.7 15.6 10.3 15.3 9.6 15.3C6 15.3 4.5 18 4.5 19.8C4.5 22.3 7.6 23.6 8.3 23.9C9.2 24.2 12.5 25.3 16.5 25.3C16.5 25.3 19.3 25.3 21.6 24.6C22.6 24.3 26 23.3 26.8 19.8C27.1 18.6 26.9 17.5 26.3 16.5ZM24.2 21.1C23.6 22 21.1 22.7 20.4 22.9C21.4 22.3 24 20.6 24.2 18.8C24.3 17.5 23.6 16.3 22.6 15.8C23.1 16.2 23.6 16.9 23.8 17.8C24.3 19.6 22.1 20.8 22.1 20.8L21.3 21.1C22.6 20.3 23.6 19.3 23.6 19.3C23.6 19.3 25.8 19.8 25.1 21.8C25 22.1 24.7 22.4 24.2 22.6V21.1Z" fill="#F80000"/>
          <path d="M16 26.5C10.5 26.5 6 27.5 6 28.5C6 29.5 10.5 30.5 16 30.5C21.5 30.5 26 29.5 26 28.5C26 27.5 21.5 26.5 16 26.5Z" fill="#5382A1"/>
        </svg>
      )
    },
    {
      name: "C#",
      icon: (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
           <path d="M64 0L119.4 32V96L64 128L8.6 96V32L64 0Z" fill="#9B4F96"/>
           <path d="M96 52V44H84V36H76V44H68V36H60V44H48C45.8 44 44 45.8 44 48V80C44 82.2 45.8 84 48 84H60V92H68V84H76V92H84V84H96V76H84V52H96ZM76 76H68V52H76V76ZM52 76V52H60V76H52Z" fill="white"/>
           <text x="64" y="85" fontSize="60" fontWeight="bold" fill="white" textAnchor="middle">C#</text>
        </svg>
      )
    },
    {
      name: "PostgreSQL",
      icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#336791]">
          <path d="M255.7 34.6C123.7 34.6 30.6 122.5 30.6 247.3C30.6 302.2 49.3 352.5 80.7 391.2C96.9 411.2 116.3 428.1 138 441.5C136.2 429.6 137.9 416.7 144.1 405.9C151.7 392.6 168.1 386.9 181.7 393.3C195.4 399.7 202.4 416.5 197.8 431.1C194.2 442.2 186.2 450.4 176.4 455.5C200.5 463.3 226.9 467.5 254.3 467.5C370.4 467.5 466.8 384.7 483.7 274.6C486.2 258.1 486.3 241.2 483.5 224.5C471.9 119.3 373.2 34.6 255.7 34.6ZM346.7 325.2C344.2 329.8 338.4 331.5 333.8 329C329.2 326.5 327.5 320.7 330 316.1C348.6 281.8 343.3 252 329.3 234.3C328.7 233.5 328.1 232.8 327.5 232C324.7 228.6 322.2 225.5 320.1 223C306.4 206.1 289.8 195.3 273.6 193.3C273.5 193.3 273.5 193.3 273.4 193.3C271.6 193.2 269.8 193.1 268 193.1C258.9 193.1 250.3 194.5 242.3 196.8C220.8 203.1 204.6 219.8 193.2 251.5C191.3 256.7 185.6 259.4 180.4 257.5C175.2 255.6 172.5 249.9 174.4 244.7C188.4 205.8 209.6 185.1 237.5 177C247.3 174.1 257.9 172.5 269.1 172.5C288.7 172.5 307.2 178.6 322.8 190.2C338.2 201.7 349.8 219.2 358.5 243.6C365.2 262.3 365.1 291.5 346.7 325.2Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Oracle",
      icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#F80000]">
          <path d="M344.5 264C344.5 316.6 298.5 363.6 248.5 363.6C198.5 363.6 166.5 316.6 166.5 264C166.5 211.4 198.5 164.4 248.5 164.4C298.5 164.4 344.5 211.4 344.5 264Z" fill="none" stroke="currentColor" strokeWidth="45"/>
          <rect x="32" y="100" width="448" height="312" rx="20" stroke="currentColor" strokeWidth="35" fill="none"/>
        </svg>
      )
    },
  ];

  // Tools
  const toolsTech = [
    {
      name: "Git",
      icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#F05032]">
          <path d="M488.7 178.6L333.4 23.3C321.1 11 301.1 11 288.7 23.3L236.4 75.6L276.7 115.9C282.8 114.3 289.4 114.8 295.2 118.2C306.9 125 310.8 139.9 304 151.6C297.2 163.3 282.3 167.2 270.6 160.4C264.9 157.1 261.2 151.6 260.1 145.4L213 98.3L23.3 288.7C11 301.1 11 321.1 23.3 333.4L178.6 488.7C190.9 501 210.9 501 223.3 488.7L488.7 223.3C501 211 501 190.9 488.7 178.6Z" fill="currentColor"/>
          <circle cx="282" cy="138" r="16" fill="white"/>
          <circle cx="212" cy="300" r="16" fill="white"/>
          <circle cx="138" cy="226" r="16" fill="white"/>
        </svg>
      )
    },
    {
      name: "Docker",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2496ED]">
          <path d="M13.983 11.078H11.115V9.5h2.868v1.578zm-3.611 0H7.504V9.5h2.868v1.578zm-3.612 0H3.892V9.5h2.868v1.578zm10.835 0h-2.868V9.5h2.868v1.578zm0-2.25h-2.868V7.25h2.868v1.578zm0-2.25h-2.868V4.999h2.868v1.579zm-3.612 2.25H11.115V7.25h2.868v1.578zm-3.611 0H7.504V7.25h2.868v1.578zm-3.612 0H3.892V7.25h2.868v1.578zm15.42 5.25c0-.668-.07-1.32-.206-1.956-.374-1.748-2.14-3.418-2.14-3.418s-1.075 1.575-1.442 2.91c-.049.177-.091.356-.129.537H23.5V11.25c-.328.026-.649.076-.949.141-1.385.3-2.316.924-2.887 1.488-.57.564-1.758 1.13-2.61 1.405-.853.275-1.928.324-2.89.14-1.019-.196-2.193-.507-2.923-1.085-.73-.578-1.575-1.22-3.153-1.018-1.579.202-3.44.823-3.44.823s.296 2.083 2.052 3.864c2.81 2.85 7.643 2.652 7.643 2.652 3.968-.135 7.15-3.048 7.37-6.288" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Figma",
      icon: (
        <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M19 28.5V0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5V57H9.5C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H9.5C4.25329 19 0 14.7467 0 9.5C0 4.25329 4.25329 0 9.5 0H19Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="#A259FF"/>
        </svg>
      )
    },
    {
      name: "Vercel",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
          <path d="M12 1L24 22H0L12 1Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Postman",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#FF6C37]">
          <path d="M11.967 0C5.362 0 0 5.362 0 11.967c0 5.176 3.298 9.58 7.917 11.237v-4.145c-2.316-1.344-3.873-3.844-3.873-6.726 0-4.333 3.513-7.847 7.846-7.847 4.332 0 7.846 3.514 7.846 7.847 0 2.91-1.59 5.43-3.955 6.762v4.133c4.7-1.616 8.067-6.066 8.067-11.296C23.848 5.362 18.533 0 11.967 0z" fill="currentColor"/>
          <path d="M11.891 7.64c-1.896 0-3.486.666-4.502 1.488l1.096 1.777c.69-.537 1.76-1.11 3.221-1.11 1.74 0 2.868.868 2.868 2.145 0 1.258-.87 1.832-2.332 2.368-1.924.685-2.738 1.5-2.738 2.812v.112h3.515v-.075c0-.98.703-1.46 2.424-2.11 1.573-.59 2.979-1.57 2.979-3.237 0-2.48-2.091-4.17-6.531-4.17z" fill="currentColor"/>
          <circle cx="12" cy="18.5" r="2" fill="currentColor"/>
        </svg>
      )
    },
  ];

  const duplicatedFrontend = [...frontendTech, ...frontendTech, ...frontendTech];
  const duplicatedBackend = [...backendTech, ...backendTech, ...backendTech];
  const duplicatedTools = [...toolsTech, ...toolsTech, ...toolsTech];

  return (
    <section id="about" className="py-8 sm:py-12 md:py-16 lg:py-24 px-2 xs:px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-8 items-start">
          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex-1"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Users className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.about.collaboration} 
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4">
                {t.about.collaborationTitle}
              </h3>
              <div className="flex items-center justify-center mt-4 xs:mt-5 sm:mt-6 md:mt-8">
                <div
                  className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl"
                  style={{
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.034)',
                    boxShadow: '0 8px 32px 0 rgba(255, 255, 255, 0.055)',
                  }}
                >
                  👨‍💻
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex-1 flex flex-col"
            >
              <div className="flex items-center gap-2 xs:gap-2.5 sm:gap-3 mb-2 xs:mb-3 sm:mb-4">
                <Clock className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {t.about.timezone}
                </span>
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                {t.about.timezoneTitle}
              </h3>

              <div className="flex flex-wrap gap-2 xs:gap-2.5 sm:gap-3 mb-3 xs:mb-3 sm:mb-4 md:mb-6">
                <div className="glass rounded-full px-3 xs:px-3.5 sm:px-4 py-1.5 xs:py-1.5 sm:py-2 flex items-center gap-1.5 xs:gap-2 bg-green-500/20 border-green-500/30">
                  <span className="text-base xs:text-lg sm:text-xl">🇧🇷</span>
                  <span className="text-xs xs:text-sm sm:text-sm font-bold text-gray-900 dark:text-white">Brazil</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center min-h-[200px] xs:min-h-[250px] sm:min-h-[350px] md:min-h-[450px]">
                <div className="w-full max-w-[500px] aspect-square">
                  <Earth3D />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-4 xs:space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 overflow-hidden flex-1"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 text-center">
                {t.about.passionate}
              </h3>

              <div className="space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
                {/* Frontend Carousel */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5 xs:mb-2 sm:mb-3 text-center">
                    {t.techArsenal.frontend}
                  </h4>
                  <div className="relative">
                    <div/>
                    <div/>
                    <div>
                      <motion.div
                        className="flex gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 pr-1.5 xs:pr-2 sm:pr-2.5 md:pr-3"
                        animate={{ x: [0, -1200] }}
                        transition={{
                          x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                          },
                        }}
                      >
                        {duplicatedFrontend.map((tech, index) => (
                          <div
                            key={`frontend-${index}`}
                            className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                          >
                            <div className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                                {tech.icon}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Backend Carousel */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5 xs:mb-2 sm:mb-3 text-center">
                    {t.techArsenal.backend}
                  </h4>
                  <div className="relative">
                    <div/>
                    <div/>
                    <div>
                      <motion.div
                        className="flex gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 pr-1.5 xs:pr-2 sm:pr-2.5 md:pr-3"
                        animate={{ x: [-1200, 0] }}
                        transition={{
                          x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 25,
                            ease: "linear",
                          },
                        }}
                      >
                        {duplicatedBackend.map((tech, index) => (
                          <div
                            key={`backend-${index}`}
                            className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                          >
                            <div className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                                {tech.icon}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Tools Carousel */}
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1.5 xs:mb-2 sm:mb-3 text-center">
                    {t.techArsenal.tools}
                  </h4>
                  <div className="relative">
                    <div/>
                    <div/>
                    <div>
                      <motion.div
                        className="flex gap-1.5 xs:gap-2 sm:gap-2.5 md:gap-3 pr-1.5 xs:pr-2 sm:pr-2.5 md:pr-3"
                        animate={{ x: [0, -1000] }}
                        transition={{
                          x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                          },
                        }}
                      >
                        {duplicatedTools.map((tech, index) => (
                          <div
                            key={`tools-${index}`}
                            className="glass rounded-lg px-2 xs:px-2.5 sm:px-3 md:px-3 py-1 xs:py-1.5 sm:py-2 flex items-center gap-1 xs:gap-1.5 sm:gap-2 min-w-fit hover:bg-white/10 transition-colors shrink-0"
                          >
                             <div className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                                {tech.icon}
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              {tech.name}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-2.5 xs:gap-3 sm:gap-4"
            >
              <a
                href="https://github.com/GabrielRossi01"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                  <div
                    className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">{t.about.github}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden xs:block">{t.about.githubDesc}</p>
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/gabriel-rossi-155baa324/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
                  <div
                    className="p-2 xs:p-2.5 sm:p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 xs:w-4.5 xs:h-4.5 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-gray-900 dark:text-white">{t.about.linkedin}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 hidden xs:block">{t.about.linkedinDesc}</p>
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 text-center"
            >
              <h3 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4">
                {t.about.workTogether}
              </h3>
              <a
                href="#contact"
                className="group relative inline-block w-auto"
              >
                <div className="relative mt-3 xs:mt-4 sm:mt-5 md:mt-6">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(60, 60, 60, 0.4), rgba(30, 30, 30, 0.6))',
                      transform: 'translateY(4px) scaleY(0.9)',
                      borderRadius: '9999px',
                    }}
                  />
                  <div
                    className="relative px-4 xs:px-4.5 sm:px-5 md:px-6 py-2 xs:py-2 sm:py-2.5 md:py-3 rounded-full flex items-center justify-center gap-2 font-medium text-xs xs:text-sm sm:text-base transition-all duration-200 group-hover:translate-y-0.5 group-active:translate-y-1"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3)',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    rossi17006@gmail.com
                  </div>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-2.5 xs:gap-3 sm:gap-4"
            >
              <div className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 text-center">
                <div className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1 xs:mb-1.5 sm:mb-2">
                  5+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {t.about.yearsExp}
                </div>
              </div>
              <div className="glass-bubble rounded-lg xs:rounded-xl sm:rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 text-center">
                <div className="text-2xl xs:text-2.5xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1 xs:mb-1.5 sm:mb-2">
                  50+
                </div>
                <div className="text-xs xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {t.about.projectsCompleted}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
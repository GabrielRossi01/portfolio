"use client";

import { motion } from 'framer-motion';

export default function TechStackMarquee() {
  const technologies = [
    {
      name: 'React',
      color: '#61DAFB',
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
      name: 'Next.js',
      color: 'currentColor',
      icon: (
        <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
          <mask id="mask0_next_tech" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
            <circle cx="90" cy="90" r="90" fill="black" />
          </mask>
          <g mask="url(#mask0_next_tech)">
            <circle cx="90" cy="90" r="90" fill="currentColor" />
            <path d="M149.508 157.527V69.111H130.373L66.7908 158.621C75.9766 163.698 86.5018 166.168 97.0425 165.94C116.88 165.51 135.633 158.288 149.508 157.527ZM22.2513 118.817V89.111H41.3861V161.732C31.5434 148.98 25.1052 134.456 22.2513 118.817ZM41.3861 69.111V69.111L41.3861 69.111Z" fill="white" className="fill-white dark:fill-black" />
          </g>
        </svg>
      )
    },
    {
      name: 'Node.js',
      color: '#339933',
      icon: (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#339933]">
          <path d="M16 0L29.856 8V24L16 32L2.144 24V8L16 0ZM24 14.5L16.5 10.2V5.7L24 10V14.5ZM15.5 5.7V10.2L8 14.5V10L15.5 5.7ZM7.5 15.4L15.5 20V29.1L7.5 24.5V15.4ZM16.5 29.1V20L24.5 15.4V24.5L16.5 29.1Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Python',
      color: '#3776AB',
      icon: (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M63.2 10.9C43.1 10.9 33.7 20 33.7 33.7V41.3H49.3V34.5C49.3 27.2 55.4 25.6 63.6 25.6C71.3 25.6 77.2 26.6 77.2 33.7C77.2 39.7 72.8 42.1 63.3 42.1H48.2C27.9 42.1 16 54.2 16 75.1V80.3C16 99.4 28.5 111.9 48.7 111.9H64.7C84.8 111.9 94.2 102.8 94.2 89.1V81.4H78.7V88.3C78.7 95.6 72.5 97.2 64.3 97.2C56.6 97.2 50.7 96.2 50.7 89.1C50.7 83.1 55.1 80.7 64.6 80.7H79.7C100 80.7 111.9 68.6 111.9 47.7V42.5C111.8 23.4 99.3 10.9 63.2 10.9ZM44.1 27.1C46.8 27.1 49 29.3 49 32C49 34.7 46.8 36.9 44.1 36.9C41.4 36.9 39.2 34.7 39.2 32C39.2 29.3 41.4 27.1 44.1 27.1ZM83.8 85.9C81.1 85.9 78.9 88.1 78.9 90.8C78.9 93.5 81.1 95.7 83.8 95.7C86.5 95.7 88.7 93.5 88.7 90.8C88.7 88.1 86.5 85.9 83.8 85.9Z" fill="url(#python_gradient_marquee)" />
          <defs>
            <linearGradient id="python_gradient_marquee" x1="16" y1="10.9" x2="111.9" y2="111.9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3776AB" />
              <stop offset="1" stopColor="#FFD343" />
            </linearGradient>
          </defs>
        </svg>
      )
    },
    {
      name: 'TypeScript',
      color: '#3178C6',
      icon: (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path d="M72.2 96.6H58.4V48.5H35.8V37.7H94.7V48.5H72.2V96.6ZM94.2 82.1C94.2 86 96.1 86.8 99.4 86.8C101.4 86.8 103 86.6 103.8 86.3L103.8 96.6C102.1 97.2 98.8 97.7 94.6 97.7C86.7 97.7 81.3 93.3 81.3 83.4C81.3 75.6 86.6 71.3 92.8 68.8L97.4 67.2C101.9 65.5 103 63.8 103 61.2C103 58.1 100.9 56.4 97.3 56.4C93.4 56.4 90.7 58.1 88.5 61.2L78.6 54.8C82.4 48.9 88.5 45.6 97.6 45.6C108.6 45.6 116.1 51.6 116.1 61.9C116.1 70.8 110.6 75 104.9 77.2L99.9 79.1C96.1 80.6 94.2 82.2 94.2 82.1Z" fill="white" />
        </svg>
      )
    },
    {
      name: 'Docker',
      color: '#2496ED',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2496ED]">
          <path d="M13.983 11.078H11.115V9.5h2.868v1.578zm-3.611 0H7.504V9.5h2.868v1.578zm-3.612 0H3.892V9.5h2.868v1.578zm10.835 0h-2.868V9.5h2.868v1.578zm0-2.25h-2.868V7.25h2.868v1.578zm0-2.25h-2.868V4.999h2.868v1.579zm-3.612 2.25H11.115V7.25h2.868v1.578zm-3.611 0H7.504V7.25h2.868v1.578zm-3.612 0H3.892V7.25h2.868v1.578zm15.42 5.25c0-.668-.07-1.32-.206-1.956-.374-1.748-2.14-3.418-2.14-3.418s-1.075 1.575-1.442 2.91c-.049.177-.091.356-.129.537H23.5V11.25c-.328.026-.649.076-.949.141-1.385.3-2.316.924-2.887 1.488-.57.564-1.758 1.13-2.61 1.405-.853.275-1.928.324-2.89.14-1.019-.196-2.193-.507-2.923-1.085-.73-.578-1.575-1.22-3.153-1.018-1.579.202-3.44.823-3.44.823s.296 2.083 2.052 3.864c2.81 2.85 7.643 2.652 7.643 2.652 3.968-.135 7.15-3.048 7.37-6.288" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Kubernetes',
      color: '#326CE5',
      icon: (
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#326CE5]">
          <path d="M62.6 3.6L16.2 26.3C13.5 27.6 11.9 30.5 11.9 33.5V87.2C11.9 90.1 13.5 92.9 16.1 94.3L60.9 119.2C62.8 120.3 65.1 120.3 67 119.2L111.9 94.2C114.5 92.8 116.1 90 116.1 87.1V33.4C116.1 30.4 114.5 27.6 111.9 26.2L66.9 3.6C65.6 2.9 64.1 2.9 62.6 3.6ZM98.7 82.3L91.1 77.4V62.7L104.2 55.4V82.3H98.7ZM66.4 107.6L66.4 92.9L79 85.5L86.6 90.4L66.4 107.6ZM59.3 107.5L39.8 90.3L47.5 85.4L60.1 92.8V107.5H59.3ZM23.8 82.2V55.3L36.9 62.6V77.3L29.3 82.2H23.8ZM29.2 38.3L36.8 43.2L23.7 50.5V38.3H29.2ZM60.1 27.6L47.5 35L39.9 30.1L59.4 12.9V27.6H60.1ZM66.4 27.7V13L85.9 30.2L78.3 35.1L66.4 27.7ZM98.7 38.4V50.6L85.5 43.3L93.1 38.4H98.7Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'PostgreSQL',
      color: '#336791',
      icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#336791]">
          <path d="M255.7 34.6C123.7 34.6 30.6 122.5 30.6 247.3C30.6 302.2 49.3 352.5 80.7 391.2C96.9 411.2 116.3 428.1 138 441.5C136.2 429.6 137.9 416.7 144.1 405.9C151.7 392.6 168.1 386.9 181.7 393.3C195.4 399.7 202.4 416.5 197.8 431.1C194.2 442.2 186.2 450.4 176.4 455.5C200.5 463.3 226.9 467.5 254.3 467.5C370.4 467.5 466.8 384.7 483.7 274.6C486.2 258.1 486.3 241.2 483.5 224.5C471.9 119.3 373.2 34.6 255.7 34.6ZM346.7 325.2C344.2 329.8 338.4 331.5 333.8 329C329.2 326.5 327.5 320.7 330 316.1C348.6 281.8 343.3 252 329.3 234.3C328.7 233.5 328.1 232.8 327.5 232C324.7 228.6 322.2 225.5 320.1 223C306.4 206.1 289.8 195.3 273.6 193.3C273.5 193.3 273.5 193.3 273.4 193.3C271.6 193.2 269.8 193.1 268 193.1C258.9 193.1 250.3 194.5 242.3 196.8C220.8 203.1 204.6 219.8 193.2 251.5C191.3 256.7 185.6 259.4 180.4 257.5C175.2 255.6 172.5 249.9 174.4 244.7C188.4 205.8 209.6 185.1 237.5 177C247.3 174.1 257.9 172.5 269.1 172.5C288.7 172.5 307.2 178.6 322.8 190.2C338.2 201.7 349.8 219.2 358.5 243.6C365.2 262.3 365.1 291.5 346.7 325.2Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'MongoDB',
      color: '#47A248',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#47A248]">
          <path d="M12.164 1.096c-.36-.452-1.353-.385-1.396.166-.37 4.672-2.31 9.07-4.103 13.338-.67 1.597-1.378 3.29-1.378 5.232 0 3.39 3.016 4.62 5.166 4.093 0 0 .152.885.508.885.357 0 .54-.925.54-.925 2.148.528 5.165-.703 5.165-4.093 0-1.942-.708-3.635-1.378-5.232-1.794-4.268-3.733-8.666-4.103-13.338-.008-.104-.015-.157-.021-.126zM11.64 22.84s-.175.056-.475-.383c0 0 .108.647.475.383zm.185-5.914c-.065.91-.013 3.654-.013 3.654s.583-.173.542-3.804c-.015-1.285-.53-3.11-.53-3.11s.065 2.348 0 3.26zm-.797.126c.065.91.013 3.654.013 3.654s-.583-.173-.542-3.804c.015-1.285.53-3.11.53-3.11s-.065 2.348 0 3.26z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Redis',
      color: '#DC382D',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#DC382D]">
          <path d="M5.56 1.706L2.24 3.73v16.54l3.32 2.024 16.2-9.874V8.34L5.56 1.706zm13.68 7.377L5.56 17.408V4.86l13.68 5.56v-1.337zm-2.52-3.414l-2.52-1.025v3.414l2.52 1.025V5.67zm0 5.12l-2.52-1.024v3.413l2.52 1.025v-3.414zM8.08 6.693L5.56 5.67v3.413l2.52 1.024V6.694zm0 5.12l-2.52-1.025v3.414l2.52 1.025v-3.414z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'AWS',
      color: '#FF9900',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#FF9900]">
          <path d="M17.436 12.383c-2.484-1.782-5.46-1.574-5.46-1.574 0 .97.025 2.193.025 2.193s2.173-.417 3.702.39c.677.359.855.932.327 1.487-1.468 1.543-5.067.892-7.534-.43-2.618-1.402-2.903-3.568-1.577-5.32 1.624-2.146 5.86-2.43 9.77-1.127l.79-2.31c-5.02-1.928-10.74-.897-12.868 1.916-2.097 2.772-1.164 6.273 2.946 8.474 3.167 1.696 8.647 3.01 11.516.03.743-.772 1.258-2.395-.88-3.927l-.757.198zM12.904 18.57c-2.735.63-6.287.094-8.086-1.185 0 0 .546 1.884 3.996 2.656 3.45.772 7.747-.534 8.718-2.032 0 0-1.894 1.15-4.628.56z" fill="currentColor" />
          <path d="M19.096 7.635v5.828l-1.393-.417V7.635h-2.332v-1.92h7.026v1.92h-3.3z" fill="#232F3E" className="fill-[#232F3E] dark:fill-white" />
        </svg>
      )
    },
    {
      name: 'GraphQL',
      color: '#E10098',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#E10098]">
          <path d="M2.373 8.163l9.64-5.566 9.614 5.545v11.125l-9.613 5.546-9.64-5.566V8.163z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 21.367l8.528-4.92V9.674" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2.618L3.473 7.54v8.892" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.472 16.432L12 11.5l8.528 4.933" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.5V2.618" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.472 7.54l17.056 9.852" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.528 7.54L3.472 17.392" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="11.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="2.6" r="1.5" fill="currentColor" />
          <circle cx="3.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="20.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="3.5" cy="16.4" r="1.5" fill="currentColor" />
          <circle cx="20.5" cy="16.4" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'REST API',
      color: '#555555',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-600 dark:text-gray-300">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Microservices',
      color: '#555555',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-600 dark:text-gray-300">
          <rect x="2" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
          <rect x="13" y="2" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
          <rect x="2" y="13" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
          <rect x="13" y="13" width="9" height="9" rx="1" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      name: 'CI/CD',
      color: '#555555',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-gray-600 dark:text-gray-300">
          <path d="M20.2 17.6l-2.8-7.9c-.3-.8-1.1-1.3-1.9-1.3H15c-.2 0-.4-.3-.3-.5l1-3.7c.3-1.1-.6-2.2-1.7-2.2H8.5c-.8 0-1.5.5-1.8 1.3L4 11.2c-.3.8.3 1.6 1.1 1.6h2.5c.2 0 .4.3.3.5l-1 3.7c-.3 1.1.6 2.2 1.7 2.2h5.5c.8 0 1.5-.5 1.8-1.3l2.8-7.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 8v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
  ];

  const duplicatedTech = [...technologies, ...technologies, ...technologies];

  return (
    <section id="skills" className="py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-4 xs:mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2 xs:px-3 sm:px-4"
      >
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-1 xs:mb-1.5 sm:mb-2 md:mb-3 lg:mb-4 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <p className="text-xs xs:text-xs sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
          Technologies I work with
        </p>
      </motion.div>

      <div className="relative">
        {/* Gradient Blur Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-6 xs:w-8 sm:w-16 md:w-24 bg-linear-to-r from-white dark:from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-6 xs:w-8 sm:w-16 md:w-24 bg-linear-to-l from-white dark:from-[#0a0a0a] to-transparent z-10" />

        <motion.div
          className="flex gap-2 xs:gap-3 sm:gap-6 md:gap-8 w-max"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 lg:gap-3 px-2 xs:px-3 sm:px-4 lg:px-6 py-1.5 xs:py-2 sm:py-3 lg:py-4 rounded-lg xs:rounded-xl sm:rounded-xl lg:rounded-2xl border-black/5 dark:border-white/5 backdrop-blur-xs min-w-fit hover:bg-white/10 dark:hover:bg-white/10 transition-colors group"
            >
              <div className="w-3.5 h-3.5 xs:w-4.5 xs:h-4.5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
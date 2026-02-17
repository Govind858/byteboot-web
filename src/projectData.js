import neoTokyoImg from './assets/ProjectScreenshots/neo_tokyo.png';
import trinityImg from './assets/ProjectScreenshots/trinity.png';

export const projects = [
  {
    id: "new-tokyo",
    title: "New Tokyo",
    image:neoTokyoImg,
    category: "E-commerce Application",
    tech: ["React", "Vite", "Tailwind CSS", "Redux Toolkit"],
    description: "New Tokyo is a premium e-commerce platform designed for PC enthusiasts. It serves as a specialized digital storefront for high-end components like CPUs, motherboards, and mechanical keyboards, focusing on technical clarity and performance.",
    details: `The New Tokyo project began with the goal of creating a 'spec-first' shopping experience for the PC building community. I developed this application from scratch using React and Vite to ensure a lightning-fast user interface that can handle large inventories of hardware. The development process involved designing a custom architectural layout where users can filter complex technical specifications, such as motherboard sockets or monitor refresh rates, without any page reloads. I utilized Redux Toolkit to manage the global state of the shopping cart, ensuring that high-value hardware selections remain persistent across sessions. To give the site a modern, high-tech feel, I implemented a sleek UI using Tailwind CSS, focusing on high-resolution product imagery and a responsive grid system that works perfectly on both mobile and desktop screens.`
  },
  {
    id: "trinity",
    title: "Trinity",
    image:trinityImg,
    category: "Church Management & EdTech",
    tech: ["React", "Firebase", "Context API", "Lucide React"],
    description: "Trinity is a specialized management and educational tool built to digitize church administrative tasks and automate student examinations.",
    details: `Trinity was conceived to solve the logistical challenges of a local church that was struggling with manual paper-based record-keeping for over a hundred students. I built this application from the ground up to serve as a centralized hub for student data and academic performance. The core of the project is a custom-built examination engine that allows administrators to create and conduct digital assessments in a multiple-choice format. During the development phase, I focused heavily on the user experience for non-technical church staff, ensuring the dashboard was intuitive and secure. By using React's Context API, I managed complex authentication flows to keep student records private. The final product successfully transitioned the church to a fully digital workflow, providing instant automated grading and detailed progress analytics for every student in the system.`
  }
];
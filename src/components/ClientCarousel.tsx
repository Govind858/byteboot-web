import React from 'react';

// Import all client logos
import redDefend from '../assets/ClientLogos/Red_Defend.png';
import emmyFitness from '../assets/ClientLogos/emmy_fitness.jpg';
import myCvTracker from '../assets/ClientLogos/my_cv_tracker.png';
import soccerManiac from '../assets/ClientLogos/soccer_maniac.jpg';
import straightForward from '../assets/ClientLogos/straight_forward.jpg';
import topWorldHr from '../assets/ClientLogos/top_world_hr.jpg';
import vetcoin from '../assets/ClientLogos/vetcoin.png';
import winxzone from '../assets/ClientLogos/winxzone.png';

// Client data array
const clients = [
  { name: 'Red Defend',     logo: redDefend },
  { name: 'Emmy Fitness',   logo: emmyFitness },
  { name: 'My CV Tracker',  logo: myCvTracker },
  { name: 'Soccer Maniac',  logo: soccerManiac },
  { name: 'Straight Forward', logo: straightForward },
  { name: 'Top World HR',   logo: topWorldHr },
  { name: 'Vetcoin',        logo: vetcoin },
  { name: 'Winxzone',       logo: winxzone },
] as const;

const ClientCarousel: React.FC = () => {
  return (
    <div className="w-full bg-black/10 py-10 md:py-12 lg:py-14 overflow-hidden">
      {/* 
        The mask creates a smooth fade-in from left and fade-out to right.
        Adjust percentages to control fade length (e.g. 10%–15% is common).
      */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div
          className="flex w-max animate-scroll gap-12 md:gap-16 lg:gap-20 items-center"
        >
          {/* Duplicate the list twice for seamless infinite scroll */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-[100px] min-w-[100px] md:w-[120px] md:min-w-[120px] flex-shrink-0 group cursor-pointer"
            >
              <div className="h-12 w-full flex items-center justify-center mb-2 md:mb-3">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="h-8 md:h-9 w-auto max-w-[90px] md:max-w-[110px] object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <span className="text-gray-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider group-hover:text-brand-accent transition-colors duration-300 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Inline styles for animation */}
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Optional: slightly smoother on some browsers */
        .animate-scroll {
          animation-timing-function: linear;
        }
      `}</style>
    </div>
  );
};

export default ClientCarousel;
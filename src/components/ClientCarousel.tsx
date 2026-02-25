import React from 'react';
import "./ClientCarousel.css"

// ── Existing logos ─────────────────────────────────────────────────────────────
import redDefend from '../assets/ClientLogos/Red_Defend.png';
import emmyFitness from '../assets/ClientLogos/emmy_fitness.jpg';
import myCvTracker from '../assets/ClientLogos/my_cv_tracker.png';
import soccerManiac from '../assets/ClientLogos/soccer_maniac.jpg';
import straightForward from '../assets/ClientLogos/straight_forward.jpg';
import topWorldHr from '../assets/ClientLogos/top_world_hr.jpg';
import vetcoin from '../assets/ClientLogos/vetcoin.png';
import winxzone from '../assets/ClientLogos/winxzone.png';

// ── New logos ──────────────────────────────────────────────────────────────────
import billsBerry from '../assets/ClientLogos/bills_berry.jpeg';
import blossamBritish from '../assets/ClientLogos/blossam_british.jpeg';
import empireFitness from '../assets/ClientLogos/empire_fitsness.jpeg';
import greatWaters from '../assets/ClientLogos/great_waters.jpeg';
import medicare from '../assets/ClientLogos/medicare.jpeg';
import newTokyo from '../assets/ClientLogos/new_tokyo.jpeg';
import olaCars from '../assets/ClientLogos/ola_cars.jpeg';
import olaCredits from '../assets/ClientLogos/ola_credits.jpeg';
import rockViewResort from '../assets/ClientLogos/rock_view_resort.jpeg';
import techfordInfo from '../assets/ClientLogos/techford_information.jpeg';
import trinity from '../assets/ClientLogos/trinity.jpeg';

// ── Client data ────────────────────────────────────────────────────────────────
const clients = [
  { name: 'Red Defend', logo: redDefend },
  { name: 'Emmy Fitness', logo: emmyFitness },
  { name: 'My CV Tracker', logo: myCvTracker },
  { name: 'Soccer Maniac', logo: soccerManiac },
  { name: 'Straight Forward', logo: straightForward },
  { name: 'Top World HR', logo: topWorldHr },
  { name: 'Vetcoin', logo: vetcoin },
  { name: 'Winxzone', logo: winxzone },
  { name: "Bills Berry", logo: billsBerry },
  { name: "Blossam British", logo: blossamBritish },
  { name: "Empire Fitness", logo: empireFitness },
  { name: "Great Waters", logo: greatWaters },
  { name: "Medicare", logo: medicare },
  { name: "New Tokyo", logo: newTokyo },
  { name: "Ola Cars", logo: olaCars },
  { name: "Ola Credits", logo: olaCredits },
  { name: "Rock View Resort", logo: rockViewResort },
  { name: "Techford Information", logo: techfordInfo },
  { name: "Trinity", logo: trinity },
] as const;

const ClientCarousel: React.FC = () => {
  return (
    <div className="w-full bg-black/10 py-10 md:py-12 lg:py-14 overflow-hidden">
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
                  // Removed grayscale and opacity classes below
                  className="h-8 md:h-9 w-auto max-w-[90px] md:max-w-[110px] object-contain transition-all duration-300 ease-out transform group-hover:scale-110"
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
    </div>
  );
};

export default ClientCarousel;
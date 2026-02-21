import './UsersReviews.css';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const reviews = [
  {
    name: "Rajesh Babu",
    date: "2 months ago",
    rating: 5,
    review: "Great Waters Energy approached Byteboot for developing a manhour recording system. The team delivered an exceptional product — clean UI, solid backend, and great communication throughout.",
    tag: "Development",
    variant: "cyan",
  },
  {
    name: "M Akshay",
    date: "3 months ago",
    rating: 4,
    review: "Beta Infotech offers a moderately good option for businesses seeking reliable tech solutions. Their team is responsive and consistent with what was promised.",
    tag: "Consulting",
    variant: "purple",
  },
  {
    name: "Abhishek Hari",
    date: "1 month ago",
    rating: 5,
    review: "BetaBot infotech offers top-notch solutions with cutting-edge innovation. Truly impressed by the level of professionalism and the quality of their deliverables.",
    tag: "Innovation",
    variant: "cyan",
  },
  {
    name: "Joel Thomas",
    date: "4 months ago",
    rating: 4.5,
    review: "The conducive atmosphere and encouraging faculty create an ideal setting for learning. The internship was well-structured and extremely valuable for my career.",
    tag: "Internship",
    variant: "purple",
  },
  {
    name: "Basil Eldho",
    date: "5 months ago",
    rating: 4,
    review: "Professional team that understands client requirements well. They were transparent about timelines and delivered a polished product. Definitely recommend.",
    tag: "Web App",
    variant: "cyan",
  },
  {
    name: "Pranav P.",
    date: "2 months ago",
    rating: 5,
    review: "Highly recommended. Hospitality and other facilities are on just another level. The team goes above and beyond to ensure client satisfaction at every milestone.",
    tag: "Support",
    variant: "purple",
  },
  {
    name: "Alen Jacob",
    date: "6 months ago",
    rating: 4.5,
    review: "It was a better experience than I thought. The staff was very helpful and guided me through the entire development lifecycle. Great place to get ideas built.",
    tag: "Mobile App",
    variant: "cyan",
  },
  {
    name: "Sreelakshmi N.",
    date: "1 month ago",
    rating: 5,
    review: "Outstanding UI/UX design work! The team translated our vision into a beautiful, intuitive product that our users love. Communication was top-tier throughout.",
    tag: "UI/UX",
    variant: "purple",
  },
  {
    name: "Arun Krishnan",
    date: "3 months ago",
    rating: 4,
    review: "Solid technical expertise and a great eye for detail. The backend architecture they built scales beautifully. We've had zero downtime since launch.",
    tag: "Backend",
    variant: "cyan",
  },
  {
    name: "Divya Menon",
    date: "2 months ago",
    rating: 4.5,
    review: "Really pleased with the digital marketing and branding support. They understood our audience perfectly and the campaign results exceeded our expectations.",
    tag: "Marketing",
    variant: "purple",
  },
];

// ─── STAR COMPONENT ───────────────────────────────────────────────────────────

// Renders 5 stars correctly for any rating (4, 4.5, 5, etc.)
const Stars = ({ rating, className = 'rv-star' }: { rating: number; className?: string }) => {
  return (
    <div className="rv-stars">
      {[1, 2, 3, 4, 5].map((pos) => {
        const filled = pos <= Math.floor(rating);
        const half   = !filled && pos === Math.ceil(rating) && rating % 1 !== 0;

        if (filled) {
          return (
            <svg key={pos} className={`${className} rv-star-full`} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          );
        }

        if (half) {
          const id = `half-${rating}-${pos}`;
          return (
            <svg key={pos} className={`${className} rv-star-half`} viewBox="0 0 24 24">
              <defs>
                <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#facc15"/>
                  <stop offset="50%" stopColor="#374151"/>
                </linearGradient>
              </defs>
              <path
                fill={`url(#${id})`}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          );
        }

        return (
          <svg key={pos} className={`${className} rv-star-empty`} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        );
      })}
    </div>
  );
};

// ─── REVIEW CARD ─────────────────────────────────────────────────────────────


interface ReviewCardProps {
  name: string;
  date: string;
  rating: number;
  review: string;
  tag: string;
  variant: string; // or better: 'cyan' | 'purple'
}

const ReviewCard = ({
  name,
  date,
  rating,
  review,
  tag,
  variant,
}: ReviewCardProps) => {
  return (
    <div className="rv-card">
      {/* Top: avatar + name + google badge */}
      <div className="rv-top">
        <div className="rv-user">
          <div className={`rv-avatar${variant === 'purple' ? ' purple' : ''}`}>
            {name.charAt(0)}
          </div>
          <div>
            <p className="rv-name">{name}</p>
            <p className="rv-date">{date}</p>
          </div>
        </div>

        {/* Google colour icon */}
        <div className="rv-source">
          <svg width="13" height="13" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>
      </div>

      {/* Star rating */}
      <Stars rating={rating} />

      {/* Review body */}
      <p className="rv-text">{review}</p>

      {/* Tag chip */}
      <span className={`rv-tag${variant === 'purple' ? ' purple-tag' : ''}`}>
        <svg
          width="9"
          height="9"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
          <line x1="7" y1="7" x2="7.01" y2="7" />
        </svg>
        {tag}
      </span>
    </div>
  );
};

// ─── MARQUEE ROW ─────────────────────────────────────────────────────────────

const MarqueeRow = ({ items, direction }: { items: typeof reviews; direction: 'left' | 'right' }) => (
  <div className={`marquee-row ${direction === 'left' ? 'row-left' : 'row-right'}`}>
    <div className="marquee-inner">
      {/* Duplicate for seamless loop */}
      {[...items, ...items, ...items].map((item, idx) => (
        <ReviewCard key={idx} {...item} />
      ))}
    </div>
  </div>
);

// ─── HEADER STARS (summary) ───────────────────────────────────────────────────

const HeaderStars = ({ rating }: { rating: number }) => (
  <div className="rating-stars-row">
    {[1, 2, 3, 4, 5].map((pos) => {
      const filled = pos <= Math.floor(rating);
      const half   = !filled && pos === Math.ceil(rating) && rating % 1 !== 0;

      return (
        <svg
          key={pos}
          className={`star-icon ${filled || half ? 'star-full' : 'star-empty'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {half ? (
            <>
              <defs>
                <linearGradient id="hdr-half" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#facc15"/>
                  <stop offset="50%" stopColor="#374151"/>
                </linearGradient>
              </defs>
              <path fill="url(#hdr-half)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </>
          ) : (
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          )}
        </svg>
      );
    })}
  </div>
);

// ─── MAIN ────────────────────────────────────────────────────────────────────

const GOOGLE_URL =
  "https://www.google.com/maps/place/Byteboot+techno+Solutions+Pvt+Ltd/@9.9672698,76.2997757,18z/data=!4m6!3m5!1s0x3b080d08fa24c74d:0x6e4d855cfe4fbfd6!8m2!3d9.9674011!4d76.2997183!16s%2Fg%2F11v04131yc?authuser=0&entry=ttu&g_ep=EgoyMDI2MDIxOC4wIKXMDSoASAFQAw%3D%3D";

const UsersReviews = () => {
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  // Split evenly into two rows
  const mid   = Math.ceil(reviews.length / 2);
  const row1  = reviews.slice(0, mid);
  const row2  = reviews.slice(mid);

  return (
    <section className="review-section">
      {/* Header */}
      <div className="review-header">
        <div>
          <p className="review-eyebrow">Client Testimonials</p>
          <h2 className="review-title">
            What Our <span>Clients Say</span>
          </h2>
          <p className="review-subtitle">Real feedback from businesses we've helped grow.</p>
        </div>

        <div className="rating-summary">
          <div className="rating-big">
            {avg.toFixed(1)} <span>/ 5</span>
          </div>
          <HeaderStars rating={avg} />
        </div>
      </div>

      {/* Two carousels — opposite directions */}
      <div className="marquee-track">
        <MarqueeRow items={row1} direction="left"  />
        <MarqueeRow items={row2} direction="right" />
      </div>

      {/* Footer */}
      <div className="review-footer">
        <a href={GOOGLE_URL} target="_blank" rel="noopener noreferrer" className="view-all-btn">
          View all reviews on Google
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default UsersReviews;
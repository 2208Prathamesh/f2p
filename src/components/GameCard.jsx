import { Link } from "react-router-dom";
import PremiumBadge from "./PremiumBadge";

const GameCard = ({ game }) => {
  return (
    <Link
      to={`/play/${game.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-steel/40 shadow-card transition hover:-translate-y-1 hover:border-white/30"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={game.banner_image_url}
          alt={game.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          <p className="text-lg font-semibold text-white">{game.title}</p>
          {game.is_premium && <PremiumBadge points={game.points_required} />}
        </div>
      </div>
      <div className="flex flex-1 items-center justify-between px-5 py-4">
        <p className="text-sm text-white/70">Instant play, no installs.</p>
        <span className="rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 transition group-hover:border-highlight/60 group-hover:text-white">
          Play
        </span>
      </div>
    </Link>
  );
};

export default GameCard;

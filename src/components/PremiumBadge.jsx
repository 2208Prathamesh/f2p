const PremiumBadge = ({ points }) => (
  <div className="flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
    Premium · {points} pts
  </div>
);

export default PremiumBadge;

import { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { fetchGames } from "../services/gameService";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-heading">Game library</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Browse the latest releases</h1>
        </div>
        <div className="glass-panel flex items-center gap-4 rounded-full px-5 py-3 text-sm text-white/70">
          <span>{games.length} games</span>
          <span className="h-2 w-2 rounded-full bg-highlight" />
          <span>Instant browser play</span>
        </div>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Games;

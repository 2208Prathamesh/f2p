import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { fetchGames } from "../services/gameService";

const Home = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetchGames().then((data) => setFeatured(data.slice(0, 3)));
  }, []);

  return (
    <div className="space-y-16">
      <section className="rounded-[32px] bg-hero px-8 py-14 shadow-card">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="section-heading">Premium cloud arcade</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Play premium browser games with a trusted, modern experience.
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Discover curated releases, earn rewards for every minute played, and unlock premium
              titles with your points. Everything is delivered through secure embedded experiences.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/games" className="button-primary">
                Explore games
              </Link>
              <Link to="/dashboard" className="button-secondary">
                View dashboard
              </Link>
            </div>
          </div>
          <div className="glass-panel rounded-3xl p-6">
            <div className="grid gap-4">
              {[
                { label: "Active players", value: "24,830" },
                { label: "Premium unlock rate", value: "68%" },
                { label: "Average session", value: "22 min" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-steel/40 px-5 py-4"
                >
                  <span className="text-sm text-white/60">{stat.label}</span>
                  <span className="text-xl font-semibold text-white">{stat.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-highlight/30 bg-highlight/10 px-5 py-4 text-sm text-white/70">
              Premium access unlocks automatically based on verified playtime points.
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="section-heading">Featured</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Editor spotlight</h2>
          </div>
          <Link to="/games" className="text-sm font-medium text-highlight hover:text-white">
            See all games →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

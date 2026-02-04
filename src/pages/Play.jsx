import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../services/gameService";
import { saveGameSession, updateUserStats } from "../services/sessionService";
import { useAuth } from "../hooks/useAuth";

const Play = () => {
  const { id } = useParams();
  const { user, setUser } = useAuth();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const sessionStartRef = useRef(null);

  useEffect(() => {
    fetchGameById(id)
      .then(setGame)
      .finally(() => setLoading(false));
  }, [id]);

  const isLocked = useMemo(() => {
    if (!game?.is_premium) return false;
    return (user?.points ?? 0) < game.points_required;
  }, [game, user]);

  useEffect(() => {
    if (!game || isLocked || !user) return;

    const start = new Date();
    sessionStartRef.current = start;

    const handleBeforeUnload = () => {
      if (!sessionStartRef.current) return;
      const end = new Date();
      const duration = Math.max(0, Math.floor((end - sessionStartRef.current) / 1000));
      navigator.sendBeacon?.(
        "/session",
        JSON.stringify({
          user_id: user.id,
          game_id: game.id,
          session_start: sessionStartRef.current.toISOString(),
          session_end: end.toISOString(),
          duration,
        })
      );
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [game, isLocked, user]);

  useEffect(() => {
    return () => {
      if (!sessionStartRef.current || !user || !game || isLocked) return;
      const end = new Date();
      const duration = Math.max(0, Math.floor((end - sessionStartRef.current) / 1000));
      const sessionPayload = {
        user_id: user.id,
        game_id: game.id,
        session_start: sessionStartRef.current.toISOString(),
        session_end: end.toISOString(),
        duration,
      };

      saveGameSession(sessionPayload).then(() => {
        const totalPlayTime = (user.total_play_time ?? 0) + duration;
        const pointsEarned = Math.floor(duration / 60);
        const totalPoints = (user.points ?? 0) + pointsEarned;
        updateUserStats({ total_play_time: totalPlayTime, points: totalPoints }).then((profile) => {
          setUser(profile);
        });
      });
    };
  }, [game, isLocked, setUser, user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="glass-panel rounded-2xl px-8 py-6 text-sm text-white/70">Loading game...</div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="glass-panel rounded-3xl px-8 py-10 text-center text-white/60">
        Game not found.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="section-heading">Now playing</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{game.title}</h1>
        </div>
        {game.is_premium && (
          <div className="rounded-full border border-gold/40 bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gold">
            Premium · {game.points_required} points required
          </div>
        )}
      </header>

      {isLocked ? (
        <div className="glass-panel rounded-3xl border border-white/10 p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <img
              src={game.banner_image_url}
              alt={game.title}
              className="h-full max-h-[360px] w-full rounded-3xl object-cover"
            />
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">Unlock this premium title</h2>
              <p className="text-white/60">
                Earn {game.points_required - (user?.points ?? 0)} more points to access this game.
                Points are awarded automatically for every minute played.
              </p>
              <div className="rounded-2xl border border-highlight/30 bg-highlight/10 px-5 py-4 text-sm text-white/70">
                You currently have {user?.points ?? 0} points.
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl border border-white/10 p-4">
          <div className="aspect-video w-full overflow-hidden rounded-3xl border border-white/10">
            <iframe
              title={game.title}
              src={game.iframe_url}
              className="h-full w-full"
              allow="fullscreen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Play;

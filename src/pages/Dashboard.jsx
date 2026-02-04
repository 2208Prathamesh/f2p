import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchUserSessions } from "../services/sessionService";

const Dashboard = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchUserSessions(user.id).then(setSessions);
  }, [user]);

  const stats = useMemo(() => {
    const totalPlaySeconds = user?.total_play_time ?? 0;
    const totalPlayMinutes = Math.floor(totalPlaySeconds / 60);
    const gamesPlayed = new Set(sessions.map((session) => session.game_id)).size;
    return {
      totalPlayMinutes,
      points: user?.points ?? 0,
      gamesPlayed,
    };
  }, [sessions, user]);

  return (
    <div className="space-y-10">
      <header>
        <p className="section-heading">Player dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back</h1>
        <p className="mt-3 text-sm text-white/60">
          Track your playtime, points, and unlock status across the arcade.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          { label: "Total playtime", value: `${stats.totalPlayMinutes} min` },
          { label: "Total points", value: stats.points },
          { label: "Games played", value: stats.gamesPlayed },
        ].map((item) => (
          <div
            key={item.label}
            className="glass-panel rounded-3xl border border-white/10 px-6 py-6 shadow-card"
          >
            <p className="text-sm text-white/60">{item.label}</p>
            <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel rounded-3xl border border-white/10 p-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="section-heading">Points accelerator</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Earn premium access</h2>
            <p className="mt-3 text-sm text-white/60">
              Play any unlocked game and gain one point per minute. Premium titles unlock
              automatically once you meet the required threshold.
            </p>
          </div>
          <div className="rounded-2xl border border-highlight/40 bg-highlight/10 px-5 py-4 text-sm text-white/70">
            You have {stats.points} points ready to spend.
          </div>
        </div>
      </section>

      {user?.role === "admin" && (
        <section className="space-y-6">
          <div>
            <p className="section-heading">Admin control</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">User activity & management</h2>
            <p className="mt-3 text-sm text-white/60">
              Monitor platform engagement, manage access policies, and configure outbound email
              delivery for transactional updates.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="glass-panel rounded-3xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white">Live activity overview</h3>
              <div className="mt-4 space-y-4 text-sm text-white/60">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-steel/40 px-4 py-3">
                  <span>Active sessions</span>
                  <span className="text-white">18</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-steel/40 px-4 py-3">
                  <span>Premium unlocks today</span>
                  <span className="text-white">42</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-steel/40 px-4 py-3">
                  <span>Flagged sessions</span>
                  <span className="text-white">0</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" className="button-secondary">
                  Review user sessions
                </button>
                <button type="button" className="button-primary">
                  Manage access rules
                </button>
              </div>
            </div>

            <div className="glass-panel rounded-3xl border border-white/10 p-6">
              <h3 className="text-lg font-semibold text-white">SMTP configuration</h3>
              <p className="mt-2 text-sm text-white/60">
                Connect your secure mail relay to send verification emails, receipts, and
                reward notifications.
              </p>
              <div className="mt-4 space-y-4 text-sm">
                <div>
                  <label className="text-sm text-white/60">SMTP host</label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-sm text-white"
                    placeholder="smtp.yourdomain.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60">Sender identity</label>
                  <input
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-charcoal px-4 py-3 text-sm text-white"
                    placeholder="no-reply@yourdomain.com"
                  />
                </div>
                <button type="button" className="button-primary w-full">
                  Save SMTP settings
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;

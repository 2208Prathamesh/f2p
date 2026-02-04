import { updateUserProfile } from "./authService";

const sessionKey = "f2p.sessions";

const readSessions = () => {
  const stored = localStorage.getItem(sessionKey);
  if (!stored) return [];
  return JSON.parse(stored);
};

const writeSessions = (sessions) => {
  localStorage.setItem(sessionKey, JSON.stringify(sessions));
};

export const saveGameSession = async ({ user_id, game_id, session_start, session_end, duration }) => {
  const sessions = readSessions();
  const newSession = {
    id: crypto.randomUUID(),
    user_id,
    game_id,
    session_start,
    session_end,
    duration,
  };
  const nextSessions = [...sessions, newSession];
  writeSessions(nextSessions);
  return Promise.resolve(newSession);
};

export const fetchUserSessions = async (userId) => {
  const sessions = readSessions();
  return Promise.resolve(sessions.filter((session) => session.user_id === userId));
};

export const updateUserStats = async ({ total_play_time, points }) => {
  return updateUserProfile({ total_play_time, points });
};

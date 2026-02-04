const storageKey = "f2p.auth.user";

const defaultProfile = (email) => ({
  id: crypto.randomUUID(),
  email,
  total_play_time: 0,
  points: 0,
  created_at: new Date().toISOString(),
  role: email.startsWith("admin") ? "admin" : "player",
});

export const signup = async ({ email, password }) => {
  const user = defaultProfile(email);
  const profile = { ...user, password }; // stored locally for demo purposes only
  localStorage.setItem(storageKey, JSON.stringify(profile));
  return Promise.resolve(user);
};

export const login = async ({ email, password }) => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) {
    return Promise.reject(new Error("No account found. Please sign up."));
  }
  const profile = JSON.parse(stored);
  if (profile.email !== email || profile.password !== password) {
    return Promise.reject(new Error("Invalid credentials."));
  }
  return Promise.resolve({ ...profile, password: undefined });
};

export const logout = async () => {
  return Promise.resolve();
};

export const getCurrentUser = async () => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return Promise.resolve(null);
  const profile = JSON.parse(stored);
  return Promise.resolve({ ...profile, password: undefined });
};

export const updateUserProfile = async (updates) => {
  const stored = localStorage.getItem(storageKey);
  if (!stored) return Promise.resolve(null);
  const profile = JSON.parse(stored);
  const nextProfile = { ...profile, ...updates };
  localStorage.setItem(storageKey, JSON.stringify(nextProfile));
  return Promise.resolve({ ...nextProfile, password: undefined });
};

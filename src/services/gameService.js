const games = [
  {
    id: "neon-drift",
    title: "Neon Drift",
    banner_image_url:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    iframe_url: "https://example.com/iframe/neon-drift",
    is_premium: false,
    points_required: 0,
  },
  {
    id: "starforge-arena",
    title: "Starforge Arena",
    banner_image_url:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    iframe_url: "https://example.com/iframe/starforge-arena",
    is_premium: true,
    points_required: 40,
  },
  {
    id: "lumen-quest",
    title: "Lumen Quest",
    banner_image_url:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    iframe_url: "https://example.com/iframe/lumen-quest",
    is_premium: false,
    points_required: 0,
  },
  {
    id: "voidrunner",
    title: "Voidrunner",
    banner_image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    iframe_url: "https://example.com/iframe/voidrunner",
    is_premium: true,
    points_required: 75,
  },
  {
    id: "zenith-ops",
    title: "Zenith Ops",
    banner_image_url:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    iframe_url: "https://example.com/iframe/zenith-ops",
    is_premium: true,
    points_required: 120,
  },
  {
    id: "arcline",
    title: "Arcline",
    banner_image_url:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    iframe_url: "https://example.com/iframe/arcline",
    is_premium: false,
    points_required: 0,
  },
];

export const fetchGames = async () => {
  return Promise.resolve(games);
};

export const fetchGameById = async (id) => {
  const game = games.find((item) => item.id === id);
  return Promise.resolve(game);
};

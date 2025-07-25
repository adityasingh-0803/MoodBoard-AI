const { HashRouter, Routes, Route, useNavigate, useLocation } = ReactRouterDOM;

function Home() {
  const [mood, setMood] = React.useState("happy");
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem("mood", mood);
    navigate("/results");
  };

  return (
    <div className="container">
      <h1>MoodBoard AI 🎧</h1>
      <p>Select your mood to get songs + a motivational quote</p>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="happy">Happy 😊</option>
        <option value="sad">Sad 😢</option>
        <option value="angry">Angry 😠</option>
        <option value="calm">Calm 😌</option>
      </select>
      <button onClick={handleSubmit}>Get Suggestions</button>
    </div>
  );
}

function Results() {
  const mood = localStorage.getItem("mood") || "happy";

  const music = {
    happy: ["🎵 Pharrell - Happy", "🎵 Justin Timberlake - Can't Stop the Feeling", "🎵 Katrina & The Waves - Walking on Sunshine"],
    sad: ["🎵 Adele - Someone Like You", "🎵 Sam Smith - Stay With Me", "🎵 Billie Eilish - Everything I Wanted"],
    angry: ["🎵 Eminem - Lose Yourself", "🎵 Linkin Park - Numb", "🎵 DMX - X Gon' Give It To Ya"],
    calm: ["🎵 Coldplay - Yellow", "🎵 Norah Jones - Don't Know Why", "🎵 Ludovico Einaudi - Nuvole Bianche"]
  };

  const quotes = {
    happy: "“Happiness is not something ready made. It comes from your own actions.” – Dalai Lama",
    sad: "“Tears come from the heart and not from the brain.” – Leonardo da Vinci",
    angry: "“For every minute you remain angry, you give up sixty seconds of peace of mind.” – Ralph Waldo Emerson",
    calm: "“Calm mind brings inner strength and self-confidence.” – Dalai Lama"
  };

  return (
    <div className="container">
      <h2>Your {mood.charAt(0).toUpperCase() + mood.slice(1)} Mood Playlist</h2>
      <ul>
        {music[mood].map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
      <p><em>{quotes[mood]}</em></p>
    </div>
  );
}

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </HashRouter>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

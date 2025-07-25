const { useState, useEffect } = React;
const { createRoot } = ReactDOM;
const { HashRouter, Routes, Route, Link, useNavigate } = ReactRouterDOM;

const moodData = {
  happy: {
    songs: ["Happy - Pharrell Williams", "Can't Stop the Feeling - Justin Timberlake", "Good Vibes - Chris Janson"],
    quote: "Happiness is not something ready made. It comes from your own actions. – Dalai Lama"
  },
  sad: {
    songs: ["Someone Like You - Adele", "Let Her Go - Passenger", "Fix You - Coldplay"],
    quote: "Tears come from the heart and not from the brain. – Leonardo da Vinci"
  },
  chill: {
    songs: ["Sunflower - Post Malone", "Lo-Fi Beats", "Weightless - Marconi Union"],
    quote: "Sometimes the most productive thing you can do is relax. – Mark Black"
  },
  motivated: {
    songs: ["Eye of the Tiger - Survivor", "Stronger - Kanye West", "Lose Yourself - Eminem"],
    quote: "The future depends on what you do today. – Mahatma Gandhi"
  }
};

function Home() {
  const [mood, setMood] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem('mood', mood);
    navigate('/result');
  };

  return (
    <div className="container">
      <h1>MoodBoard AI 🎧</h1>
      <p>Select your mood and get a playlist + a quote!</p>
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">-- Select Mood --</option>
        <option value="happy">Happy</option>
        <option value="sad">Sad</option>
        <option value="chill">Chill</option>
        <option value="motivated">Motivated</option>
      </select>
      <br /><br />
      <button onClick={handleSubmit} disabled={!mood}>Get Suggestions</button>
    </div>
  );
}

function Result() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const mood = localStorage.getItem('mood');
    if (mood && moodData[mood]) {
      setResult(moodData[mood]);
    } else {
      setResult({ songs: [], quote: "Invalid mood selected." });
    }
  }, []);

  return (
    <div className="container">
      <h2>Your MoodBoard</h2>
      {result && (
        <>
          <h3>🎵 Playlist</h3>
          <ul>
            {result.songs.map((song, i) => <li key={i}>{song}</li>)}
          </ul>
          <h3>💬 Quote</h3>
          <blockquote>{result.quote}</blockquote>
          <Link to="/"><button>Try Again</button></Link>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </HashRouter>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);

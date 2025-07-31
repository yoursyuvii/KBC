import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import LandingPage from "./components/LandingPage";
import Start from "./components/Start";
import EndScreen from "./components/EndScreen";
import Cursor from "./components/Cursor";

function App() {
  // View management state - yahi control karta hai ki kaun sa page dikhega
  const [view, setView] = useState('landing'); // 'landing', 'login', 'register', 'dashboard', 'game'
  
  // User aur Authentication state
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  // Game state
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  
  // API aur Data state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Lifelines
  const [lifelines, setLifelines] = useState({ fiftyFifty: 1, addTime: 1 });
  const [fiftyFiftyTrigger, setFiftyFiftyTrigger] = useState(false);
  const [addTimeTrigger, setAddTimeTrigger] = useState(false);

  // App load hone par check karein ki user pehle se logged in hai ya nahi
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Game shuru hone par questions fetch karein
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        const questions = await response.json();
        const formattedQuestions = questions.map((q, index) => ({
          id: index + 1,
          question: q.question.text,
          answers: [...q.incorrectAnswers.map(text => ({ text, correct: false })), { text: q.correctAnswer, correct: true }].sort(() => Math.random() - 0.5),
        }));
        setData(formattedQuestions);
      } catch (error) {
        console.error("API se questions fetch karne mein error:", error);
      } finally {
        setLoading(false);
      }
    };
    if (view === 'game') {
      fetchQuestions();
    }
  }, [view]);

  // Jab game stop ho, toh result save karein
  useEffect(() => {
    const saveGame = async () => {
      if (stop && token && earned !== "₹ 0") {
        await fetch("http://localhost:5000/api/games/save", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
          body: JSON.stringify({ earnedAmount: earned }),
        });
      }
    };
    saveGame();
  }, [stop, token, earned]);

  const handleFiftyFifty = () => {
    if (lifelines.fiftyFifty > 0) {
      setLifelines(prev => ({ ...prev, fiftyFifty: prev.fiftyFifty - 1 }));
      setFiftyFiftyTrigger(true);
    }
  };

  const handleAddTime = () => {
    if (lifelines.addTime > 0) {
      setLifelines(prev => ({ ...prev, addTime: prev.addTime - 1 }));
      setAddTimeTrigger(true);
    }
  };

  const moneyPyramid = useMemo(() => [
    { id: 1, amount: "₹ 5,000" }, { id: 2, amount: "₹ 10,000" }, { id: 3, amount: "₹ 20,000" },
    { id: 4, amount: "₹ 40,000" }, { id: 5, amount: "₹ 80,000" }, { id: 6, amount: "₹ 1,60,000" },
    { id: 7, amount: "₹ 3,20,000" }, { id: 8, amount: "₹ 6,40,000" }, { id: 9, amount: "₹ 12,50,000" },
    { id: 10, amount: "₹ 25,00,000" }, { id: 11, amount: "₹ 50,00,000" }, { id: 12, amount: "₹ 1 Crore" },
    { id: 13, amount: "₹ 3 Crore" }, { id: 14, amount: "₹ 5 Crore" }, { id: 15, amount: "₹ 7 Crore" },
  ].reverse(), []);

  useEffect(() => {
    if (questionNumber > 1) {
      const foundMoney = moneyPyramid.find((m) => m.id === questionNumber - 1);
      if (foundMoney) setEarned(foundMoney.amount);
    }
  }, [questionNumber, moneyPyramid]);

  const handlePlayAgain = () => {
    setQuestionNumber(1);
    setEarned("₹ 0");
    setStop(false);
    setLifelines({ fiftyFifty: 1, addTime: 1 });
    setFiftyFiftyTrigger(false);
    setAddTimeTrigger(false);
    setAnsweredQuestions([]);
    setView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setView('landing');
  };

  // Yeh function control karega ki kaun sa component dikhana hai
  const renderContent = () => {
    switch (view) {
      case 'start':
        return <Start setUsername={setUsername} setView={setView} isGameStarted={view === 'game'} />;
      case 'game':
        return (
          <>
            <div className="main">
              {loading ? <h1 className="endText"></h1> :
               stop ? (
                <EndScreen username={username} earned={earned} answeredQuestions={answeredQuestions} handlePlayAgain={handlePlayAgain} />
              ) : (
                <>
                  <div className="top">
                    <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber} addTimeTrigger={addTimeTrigger} setAddTimeTrigger={setAddTimeTrigger} /></div>
                    <div className="lifelines">
                      <button className="lifeline-btn" onClick={handleFiftyFifty} disabled={lifelines.fiftyFifty === 0}>50:50</button>
                      <button className="lifeline-btn" onClick={handleAddTime} disabled={lifelines.addTime === 0}>+30s</button>
                    </div>
                  </div>
                  <div className="bottom">
                    {data.length > 0 && <Trivia data={data} setStop={setStop} questionNumber={questionNumber} setQuestionNumber={setQuestionNumber} fiftyFiftyTrigger={fiftyFiftyTrigger} setAnsweredQuestions={setAnsweredQuestions} />}
                  </div>
                </>
              )}
            </div>
            <div className="pyramid">
              <ul className="moneyList">
                {moneyPyramid.map((m) => (
                  <li key={m.id} className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{m.id}</span>
                    <span className="moneyListItemAmount">{m.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        );
      default:
        return <LandingPage setView={setView} user={user} handleLogout={handleLogout} />;
    }
  };

  return (
    <div className="app">
      <Cursor />
      {renderContent()}
    </div>
  );
}

export default App;

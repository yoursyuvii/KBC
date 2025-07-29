import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
import CelebrationConfetti from "./components/CelebrationConfetti";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("₹ 0");
  const [correctAnswerText, setCorrectAnswerText] = useState(null);

  // API se data laane ke liye state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lifelines State
  const [lifelines, setLifelines] = useState({
    fiftyFifty: 1, // 1 means available, 0 means used
  });
  const [fiftyFiftyTrigger, setFiftyFiftyTrigger] = useState(false);

  // API se questions fetch karne ke liye useEffect
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://the-trivia-api.com/v2/questions");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const questions = await response.json();
        const formattedQuestions = questions.map((q) => {
          const incorrectAnswers = q.incorrectAnswers.map((text) => ({ text, correct: false }));
          const correctAnswer = { text: q.correctAnswer, correct: true };
          const allAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);
          return {
            id: q.id,
            question: q.question.text,
            answers: allAnswers,
          };
        });
        setData(formattedQuestions);
      } catch (error) {
        console.error("API se questions fetch karne mein error:", error);
        setData([]); // Error hone par data ko khali kar dein
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchQuestions();
    }
  }, [username]);


  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "₹ 5,000" },
        { id: 2, amount: "₹ 10,000" },
        { id: 3, amount: "₹ 20,000" },
        { id: 4, amount: "₹ 40,000" },
        { id: 5, amount: "₹ 80,000" },
        { id: 6, amount: "₹ 1,60,000" },
        { id: 7, amount: "₹ 3,20,000" },
        { id: 8, amount: "₹ 6,40,000" },
        { id: 9, amount: "₹ 12,50,000" },
        { id: 10, amount: "₹ 25,00,000" },
        { id: 11, amount: "₹ 50,00,000" },
        { id: 12, amount: "₹ 1 Crore" },
        { id: 13, amount: "₹ 3 Crore" },
        { id: 14, amount: "₹ 5 Crore" },
        { id: 15, amount: "₹ 7 Crore" },
      ].reverse(),
    []
  );

  useEffect(() => {
    if (questionNumber > 1) {
      const foundMoney = moneyPyramid.find((m) => m.id === questionNumber - 1);
      if (foundMoney) {
        setEarned(foundMoney.amount);
      }
    }
  }, [questionNumber, moneyPyramid]);

  useEffect(() => {
    if (stop && questionNumber > 0 && data.length > 0) {
      const currentQuestion = data[questionNumber - 1];
      if (currentQuestion) {
        const correctAnswer = currentQuestion.answers.find(ans => ans.correct);
        if (correctAnswer) {
          setCorrectAnswerText(correctAnswer.text);
        }
      }
    }
  }, [stop, questionNumber, data]);

  useEffect(() => {
    if (data.length > 0 && questionNumber > data.length) {
      setStop(true);
    }
  }, [questionNumber, data.length]);

  useEffect(() => {
    setFiftyFiftyTrigger(false);
  }, [questionNumber]);

  const handleFiftyFifty = () => {
    if (lifelines.fiftyFifty > 0 && !fiftyFiftyTrigger) {
      setLifelines(prev => ({ ...prev, fiftyFifty: 0 }));
      setFiftyFiftyTrigger(true);
    }
  };

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {loading ? (
              <h1 className="endText"></h1>
            ) : stop ? (
              <div className="endScreenContainer">
                <CelebrationConfetti />
                <h1 className="endText">Aapne jeete: {earned}</h1>
                {correctAnswerText && (
                  <h2 className="correctAnswerText">
                    Sahi jawaab tha: {correctAnswerText}
                  </h2>
                )}
              </div>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                  <div className="lifelines">
                    <div
                      className={`lifeline ${lifelines.fiftyFifty === 0 && 'used'}`}
                      onClick={handleFiftyFifty}
                    >
                      50:50
                    </div>
                  </div>
                </div>
                <div className="bottom">
                  {data.length > 0 ? (
                    <Trivia
                      data={data}
                      setStop={setStop}
                      questionNumber={questionNumber}
                      setQuestionNumber={setQuestionNumber}
                      fiftyFiftyTrigger={fiftyFiftyTrigger}
                    />
                  ) : (
                    <h1 className="endText">
                      Prashna load karne mein samasya aa rahi hai. Kripya dobara koshish karein.
                    </h1>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

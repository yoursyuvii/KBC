// file: src/App.jsx

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

  // Lifelines State
  const [lifelines, setLifelines] = useState({
    fiftyFifty: 1, // 1 means available, 0 means used
  });
  const [fiftyFiftyTrigger, setFiftyFiftyTrigger] = useState(false);

  const data = [
    {
      id: 1,
      question: "Which of these is a popular social media app?",
      answers: [
        { text: "Radio", correct: false },
        { text: "Television", correct: false },
        { text: "Newspaper", correct: false },
        { text: "Instagram", correct: true },
      ],
    },
    {
      id: 2,
      question: "According to the Ramayana, who among these was the brother of Ravana, the king of Lanka?",
      answers: [
        { text: "Meghnad", correct: false },
        { text: "Vibhishana", correct: true },
        { text: "Akshayakumara", correct: false },
        { text: "Sugriva", correct: false },
      ],
    },
    {
      id: 3,
      question: "Which of these colors is not present in the Indian national flag?",
      answers: [
        { text: "Saffron", correct: false },
        { text: "White", correct: false },
        { text: "Pink", correct: true },
        { text: "Green", correct: false },
      ],
    },
    {
      id: 4,
      question: "Which actor played the character of Gabbar Singh in the film 'Sholay'?",
      answers: [
        { text: "Amrish Puri", correct: false },
        { text: "Amjad Khan", correct: true },
        { text: "Sanjeev Kumar", correct: false },
        { text: "Pran", correct: false },
      ],
    },
    {
      id: 5,
      question: "Which of these rivers is also known as the 'Ganges of the South'?",
      answers: [
        { text: "Krishna", correct: false },
        { text: "Kaveri", correct: false },
        { text: "Narmada", correct: false },
        { text: "Godavari", correct: true },
      ],
    },
    {
      id: 6,
      question: "Who was awarded 'Man of the Match' in the 2011 Cricket World Cup final?",
      answers: [
        { text: "Gautam Gambhir", correct: false },
        { text: "Sachin Tendulkar", correct: false },
        { text: "M. S. Dhoni", correct: true },
        { text: "Yuvraj Singh", correct: false },
      ],
    },
    {
      id: 7,
      question: "From which ancient Indian scripture is our national motto 'Satyameva Jayate' taken?",
      answers: [
        { text: "Rigveda", correct: false },
        { text: "Bhagavad Gita", correct: false },
        { text: "Ramayana", correct: false },
        { text: "Mundaka Upanishad", correct: true },
      ],
    },
    {
      id: 8,
      question: "Who was the first non-Indian to be awarded the Bharat Ratna?",
      answers: [
        { text: "Nelson Mandela", correct: false },
        { text: "Khan Abdul Ghaffar Khan", correct: true },
        { text: "Mother Teresa", correct: false },
        { text: "Dalai Lama", correct: false },
      ],
    },
    {
      id: 9,
      question: "Which planet in our solar system has the most natural satellites (moons)?",
      answers: [
        { text: "Jupiter", correct: false },
        { text: "Saturn", correct: true },
        { text: "Uranus", correct: false },
        { text: "Neptune", correct: false },
      ],
    },
    {
      id: 10,
      question: "In the context of computers, what is the full form of 'URL'?",
      answers: [
        { text: "Universal Request Link", correct: false },
        { text: "Uniform Resource Locator", correct: true },
        { text: "United Resource Link", correct: false },
        { text: "Universal Record Locator", correct: false },
      ],
    },
    {
      id: 11,
      question: "In the Mahabharata, what was the name of Guru Dronacharya's son, who was also a great warrior?",
      answers: [
        { text: "Ghatotkacha", correct: false },
        { text: "Abhimanyu", correct: false },
        { text: "Ashwatthama", correct: true },
        { text: "Duryodhana", correct: false },
      ],
    },
    {
      id: 12,
      question: "Which Indian city is called the 'Queen of the Arabian Sea'?",
      answers: [
        { text: "Mumbai", correct: false },
        { text: "Goa", correct: false },
        { text: "Kochi", correct: true },
        { text: "Mangaluru", correct: false },
      ],
    },
    {
      id: 13,
      question: "Who is the author of the famous book 'The Discovery of India'?",
      answers: [
        { text: "Mahatma Gandhi", correct: false },
        { text: "Sardar Patel", correct: false },
        { text: "Subhas Chandra Bose", correct: false },
        { text: "Jawaharlal Nehru", correct: true },
      ],
    },
    {
      id: 14,
      question: "What was the name of the lander that successfully landed on the moon in the Chandrayaan-3 mission?",
      answers: [
        { text: "Pragyan", correct: false },
        { text: "Vikram", correct: true },
        { text: "Aditya", correct: false },
        { text: "Dhruv", correct: false },
      ],
    },
    {
      id: 15,
      question: "Who was the first governor of the Reserve Bank of India (RBI)?",
      answers: [
        { text: "C. D. Deshmukh", correct: false },
        { text: "Sir Osborne Smith", correct: true },
        { text: "Raghuram Rajan", correct: false },
        { text: "Manmohan Singh", correct: false },
      ],
    },
  ];

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
    if (stop && questionNumber > 0) {
      const currentQuestion = data.find(q => q.id === questionNumber);
      if (currentQuestion) {
        const correctAnswer = currentQuestion.answers.find(ans => ans.correct);
        if (correctAnswer) {
          setCorrectAnswerText(correctAnswer.text);
        }
      }
    }
  }, [stop, questionNumber, data]);

  useEffect(() => {
    if (questionNumber > 15) {
      setStop(true);
    }
  }, [questionNumber]);

  // Reset fifty-fifty trigger for new question
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
            {stop ? (
              <div className="endScreenContainer">
                <CelebrationConfetti />
                <h1 className="endText">You earned: {earned}</h1>
                {correctAnswerText && (
                  <h2 className="correctAnswerText">
                    The correct answer was: {correctAnswerText}
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
                  <Trivia
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    fiftyFiftyTrigger={fiftyFiftyTrigger}
                  />
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

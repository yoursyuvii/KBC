import { useEffect, useMemo, useState } from "react";
import "./app.css";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");

  // Yahaan 15 prashna daal diye gaye hain
  const data = [
    {
      id: 1,
      question: "Aam taur par, inmein se kis tyohaar ke dauraan 'garba' nritya kiya jaata hai?",
      answers: [
        { text: "Holi", correct: false },
        { text: "Diwali", correct: false },
        { text: "Navratri", correct: true },
        { text: "Baisakhi", correct: false },
      ],
    },
    {
      id: 2,
      question: "Inmein se kaun sa grah (planet) 'Laal Grah' ke naam se jaana jaata hai?",
      answers: [
        { text: "Shukra (Venus)", correct: false },
        { text: "Brihaspati (Jupiter)", correct: false },
        { text: "Mangal (Mars)", correct: true },
        { text: "Shani (Saturn)", correct: false },
      ],
    },
    {
      id: 3,
      question: "Mahatma Gandhi ke raajnaitik guru kaun the?",
      answers: [
        { text: "Dadabhai Naoroji", correct: false },
        { text: "Lala Lajpat Rai", correct: false },
        { text: "Gopal Krishna Gokhale", correct: true },
        { text: "Bal Gangadhar Tilak", correct: false },
      ],
    },
    {
      id: 4,
      question: "Inmein se kaun sa desh 'Land of the Rising Sun' ke naam se jaana jaata hai?",
      answers: [
        { text: "China", correct: false },
        { text: "South Korea", correct: false },
        { text: "Japan", correct: true },
        { text: "Thailand", correct: false },
      ],
    },
    {
      id: 5,
      question: "Kis Bharatiya sheher ko 'Pink City' kaha jaata hai?",
      answers: [
        { text: "Jodhpur", correct: false },
        { text: "Udaipur", correct: false },
        { text: "Jaipur", correct: true },
        { text: "Bikaner", correct: false },
      ],
    },
    {
      id: 6,
      question: "'Wings of Fire' kiski aatmakatha (autobiography) hai?",
      answers: [
        { text: "Sachin Tendulkar", correct: false },
        { text: "A. P. J. Abdul Kalam", correct: true },
        { text: "Mahatma Gandhi", correct: false },
        { text: "Jawaharlal Nehru", correct: false },
      ],
    },
    {
      id: 7,
      question: "Chandrayaan-2 mission mein lander ka kya naam tha?",
      answers: [
        { text: "Vikram", correct: true },
        { text: "Pragyan", correct: false },
        { text: "Aryabhata", correct: false },
        { text: "Bhaskara", correct: false },
      ],
    },
    {
      id: 8,
      question: "Bharat ke Samvidhan ka kaun sa anuchhed (article) asprishyata (untouchability) ko samapt karta hai?",
      answers: [
        { text: "Anuchhed 15", correct: false },
        { text: "Anuchhed 16", correct: false },
        { text: "Anuchhed 17", correct: true },
        { text: "Anuchhed 18", correct: false },
      ],
    },
    {
      id: 9,
      question: "Dadasaheb Phalke Puraskar kis kshetra mein yogdaan ke liye diya jaata hai?",
      answers: [
        { text: "Khel (Sports)", correct: false },
        { text: "Sahitya (Literature)", correct: false },
        { text: "Vigyan (Science)", correct: false },
        { text: "Cinema", correct: true },
      ],
    },
    {
      id: 10,
      question: "Mount Everest par chadhne waali pehli Bharatiya mahila kaun thi?",
      answers: [
        { text: "Arunima Sinha", correct: false },
        { text: "Premlata Agarwal", correct: false },
        { text: "Bachendri Pal", correct: true },
        { text: "Santosh Yadav", correct: false },
      ],
    },
    {
      id: 11,
      question: "1868 mein, kisne pehli baar Andaman dweep samuh ka daura kiya tha?",
      answers: [
        { text: "Lord Mayo", correct: true },
        { text: "Lord Cornwallis", correct: false },
        { text: "Lord Lytton", correct: false },
        { text: "Lord Ripon", correct: false },
      ],
    },
    {
      id: 12,
      question: "Albert Einstein ko Nobel Puraskar kis vishay par unke kaam ke liye mila tha?",
      answers: [
        { text: "Theory of Relativity", correct: false },
        { text: "Photoelectric Effect", correct: true },
        { text: "Quantum Mechanics", correct: false },
        { text: "Brownian Motion", correct: false },
      ],
    },
    {
      id: 13,
      question: "Kis Mughal shasak ne apni aatmakatha, 'Tuzuk-i-Baburi', likhi thi?",
      answers: [
        { text: "Akbar", correct: false },
        { text: "Humayun", correct: false },
        { text: "Babur", correct: true },
        { text: "Jahangir", correct: false },
      ],
    },
    {
      id: 14,
      question: "2011 mein, kis film ne 'Best Feature Film' ka National Award jeeta tha?",
      answers: [
        { text: "3 Idiots", correct: false },
        { text: "My Name is Khan", correct: false },
        { text: "Dabangg", correct: true },
        { text: "Peepli Live", correct: false },
      ],
    },
    {
      id: 15,
      question: "Sirf ek hi din ke liye Bharat ke Governor-General kaun bane the?",
      answers: [
        { text: "Lord Mountbatten", correct: false },
        { text: "C. Rajagopalachari", correct: false },
        { text: "Yeh ek trick question hai", correct: true },
        { text: "Lord Linlithgow", correct: false },
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

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
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

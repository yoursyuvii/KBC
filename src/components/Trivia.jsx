import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.wav";
import correct from "../assets/correct.wav";
import wrong from "../assets/wrong.wav";
import wait from "../assets/wait.wav";

export default function Trivia({
    data,
    setStop,
    questionNumber,
    setQuestionNumber,
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    const [waitSound, { stop: stopWaitSound }] = useSound(wait);

    useEffect(() => {
        // Jab bhi naya prashna aaye...
        setQuestion(data[questionNumber - 1]);
        // "Naya prashna" sound bajayein
        letsPlay();
        // Aur "timer/suspense" sound shuru karein
        waitSound();
    }, [data, questionNumber, letsPlay, waitSound]);

    const delay = (duration, callback) => {
        setTimeout(callback, duration);
    };

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");
        // Answer click karte hi "suspense" sound band kar dein
        stopWaitSound();

        // Jawaab verify karne ke liye delay
        delay(3000, () => {
            if (a.correct) {
                setClassName("answer correct");
                correctAnswer();
                // Agla prashna laane se pehle delay
                delay(3000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });
            } else {
                setClassName("answer wrong");
                wrongAnswer();
                // Game stop karne se pehle delay
                delay(2000, () => {
                    setStop(true);
                });
            }
        });
    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {question?.answers.map((a, index) => (
                    <div
                        key={index}
                        className={selectedAnswer === a ? className : "answer"}
                        onClick={() => !selectedAnswer && handleClick(a)}
                    >
                        {a.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

import { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/play.wav";
import correct from "../assets/correct.wav";
import wrong from "../assets/wrong.wav";

export default function Trivia({
    data,
    setStop,
    questionNumber,
    setQuestionNumber,
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    // Sound hooks
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);

    // Yeh useEffect ab sirf naya question set karega.
    // Sound ko autoplay samasya se bachne ke liye alag se handle kiya gaya hai.
    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    // Delay ke liye helper function
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback();
        }, duration);
    };

    const handleClick = (a) => {
        setSelectedAnswer(a);
        setClassName("answer active");

        // 3 second ke delay ke baad, jawaab check hoga aur sahi/galat sound bajega.
        delay(3000, () => {
            if (a.correct) {
                correctAnswer();
                setClassName("answer correct");
            } else {
                wrongAnswer();
                setClassName("answer wrong");
            }
        });

        // 5 second ke delay ke baad, agar jawaab sahi hai, toh agla question aayega.
        delay(5000, () => {
            if (a.correct) {
                // Naya question aane se theek pehle "letsPlay" sound bajega.
                letsPlay();
                // 1 second ke baad naya question set hoga.
                delay(1000, () => {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                });
            } else {
                setStop(true);
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

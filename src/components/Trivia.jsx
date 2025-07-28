// file: src/components/Trivia.jsx

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
    fiftyFiftyTrigger, // Prop to know when to apply 50:50
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [answers, setAnswers] = useState([]);

    const [letsPlay] = useSound(play);
    const [correctAnswerSound] = useSound(correct);
    const [wrongAnswerSound] = useSound(wrong);
    const [waitSound, { stop: stopWaitSound }] = useSound(wait);

    useEffect(() => {
        const currentQuestion = data[questionNumber - 1];
        setQuestion(currentQuestion);
        setAnswers(currentQuestion.answers); // Set initial answers
        letsPlay();
        waitSound();
    }, [data, questionNumber, letsPlay, waitSound]);

    // This effect handles the 50:50 lifeline
    useEffect(() => {
        if (fiftyFiftyTrigger && question) {
            const correctAnswer = question.answers.find(a => a.correct);
            const incorrectAnswers = question.answers.filter(a => !a.correct);
            
            // Randomly pick one incorrect answer to keep
            const randomIncorrect = incorrectAnswers[Math.floor(Math.random() * incorrectAnswers.length)];
            
            // Create the new set of answers (correct + one incorrect)
            const newAnswers = [correctAnswer, randomIncorrect].sort(() => Math.random() - 0.5);
            
            setAnswers(newAnswers);
        }
    }, [fiftyFiftyTrigger, question]);


    const delay = (duration, callback) => {
        setTimeout(callback, duration);
    };

    const handleClick = (a) => {
        if (selectedAnswer) return; // Prevent clicking after an answer is selected

        setSelectedAnswer(a);
        setClassName("answer active");
        stopWaitSound();

        delay(3000, () => {
            if (a.correct) {
                setClassName("answer correct");
                correctAnswerSound();
                delay(2000, () => {
                    if (questionNumber === 15) {
                        setStop(true);
                    } else {
                        setQuestionNumber((prev) => prev + 1);
                        setSelectedAnswer(null);
                    }
                });
            } else {
                setClassName("answer wrong");
                wrongAnswerSound();
                delay(1000, () => {
                    setStop(true);
                });
            }
        });
    };

    return (
        <div className="trivia">
            <div className="question">{question?.question}</div>
            <div className="answers">
                {answers.map((a, index) => (
                    <div
                        key={index}
                        className={selectedAnswer === a ? className : "answer"}
                        onClick={() => handleClick(a)}
                    >
                        {a.text}
                    </div>
                ))}
            </div>
        </div>
    );
}

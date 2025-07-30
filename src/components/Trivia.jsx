import { useEffect, useState, useRef } from "react";
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
    fiftyFiftyTrigger,
    setAnsweredQuestions,
}) {
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [answers, setAnswers] = useState([]);
    const timeoutRef = useRef([]);

    const [letsPlay] = useSound(play);
    const [correctAnswerSound] = useSound(correct);
    const [wrongAnswerSound] = useSound(wrong);
    const [waitSound, { stop: stopWaitSound }] = useSound(wait);

    useEffect(() => {
        return () => {
            timeoutRef.current.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const currentQuestion = data[questionNumber - 1];
            if (currentQuestion) {
                setQuestion(currentQuestion);
                setAnswers(currentQuestion.answers);
                letsPlay();
            } else {
                // Agar question na mile toh game stop kar dein
                setStop(true);
            }
        }
    }, [data, questionNumber, letsPlay, setStop]);

    useEffect(() => {
        if (fiftyFiftyTrigger && question) {
            const correctAnswer = question.answers.find((a) => a.correct);
            const incorrectAnswers = question.answers.filter((a) => !a.correct);

            if (incorrectAnswers.length >= 2) {
                const shuffledIncorrect = [...incorrectAnswers].sort(() => Math.random() - 0.5);
                const incorrectToKeep = shuffledIncorrect.slice(0, 1);
                const newAnswers = [correctAnswer, ...incorrectToKeep].sort(() => Math.random() - 0.5);
                setAnswers(newAnswers);
            }
        }
    }, [fiftyFiftyTrigger, question]);

    useEffect(() => {
        if (question && !selectedAnswer) {
            waitSound();
        }
        return () => {
            stopWaitSound();
        };
    }, [question, selectedAnswer, waitSound, stopWaitSound]);

    const delay = (duration, callback) => {
        const timer = setTimeout(callback, duration);
        timeoutRef.current.push(timer);
    };

    const handleClick = (a) => {
        if (selectedAnswer) return;

        stopWaitSound(); // Stop the wait sound immediately
        setSelectedAnswer(a);
        setClassName("answer active");

        setAnsweredQuestions(prev => [...prev, { question, answered: a.text }]);

        delay(3000, () => {
            if (a.correct) {
                setClassName("answer correct");
                correctAnswerSound();
                delay(2000, () => {
                    if (questionNumber === data.length) {
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

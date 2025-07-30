import React from 'react';
import CelebrationConfetti from './CelebrationConfetti';

function EndScreen({ username, earned, answeredQuestions, handlePlayAgain }) {
  const lastFourQuestions = answeredQuestions.slice(-4);

  return (
    <div className="end-screen-container">
      {earned !== "₹ 0" && <CelebrationConfetti />}
      <div className="end-screen-content">
        <h1 className="end-screen-title">Congratulations, {username}!</h1>
        <p className="end-screen-earned">You've won: {earned}</p>

        {answeredQuestions.length > 0 && answeredQuestions[answeredQuestions.length - 1].answered !== answeredQuestions[answeredQuestions.length - 1].question.answers.find(a => a.correct).text && (
          <div className="correct-answer-section">
            <p className="correct-answer-title">The correct answer for the last question was:</p>
            <p className="correct-answer-text">{answeredQuestions[answeredQuestions.length - 1].question.answers.find(a => a.correct).text}</p>
          </div>
        )}
        
        <div className="answered-questions-container">
          <h3 className="answered-questions-title">Here's a recap of your game:</h3>
          <ul className="answered-questions-list">
            {lastFourQuestions.map((item, index) => (
              <li key={index} className="answered-question-item">
                <p className="question-text"><strong>Q:</strong> {item.question.question}</p>
                <p className="correct-answer-text"><strong>Correct Answer:</strong> {item.question.answers.find(a => a.correct).text}</p>
              </li>
            ))}
          </ul>
        </div>

        <button className="play-again-btn" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default EndScreen;
import { useState } from "react";
import "./quiz.css";

type Answer = {
  id: string;
  text: string;
};

type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

type Props = {
  question: Question;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answerId: string) => void;
};

export default function Quiz({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (answerId: string) => {
    setSelectedAnswer(answerId);
    setTimeout(() => {
      onAnswer(answerId);
      setSelectedAnswer(null);
    }, 300);
  };

  return (
    <div id="quiz-container">
      <div className="quiz-wrapper">
        <div className="quiz-header">
          <span className="progress-info">
            Question {currentQuestion} sur {totalQuestions}
          </span>
        </div>

        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>

        <div className="quiz-card">
          <div className="question-section">
            <span className="question-label">Question {currentQuestion}</span>
            <h2 className="question-text">{question.question}</h2>
          </div>

          <div className="answers-section">
            <div className="answers-grid">
              {question.answers.map((answer, index) => (
                <button
                  key={answer.id}
                  className={`answer-button ${
                    selectedAnswer === answer.id ? "selected" : ""
                  }`}
                  onClick={() => handleAnswerClick(answer.id)}
                >
                  <span className="answer-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{answer.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

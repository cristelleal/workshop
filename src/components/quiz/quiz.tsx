import { useState, useEffect } from "react";
import "./quiz.css";
import Timer from "../timer/timer";

type Answer = {
  id: string;
  text: string;
  score: number;
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
  temperature?: number;
};

export default function Quiz({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showDoor, setShowDoor] = useState(true);

  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const { content, adjustTemperature, setIsTimerActive } = Timer();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDoor(false);
    }, 8000); // 8 secondes pour la nouvelle animation

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!showDoor) {
      setIsTimerActive(true);
    }
  }, [showDoor]);

  const handleAnswerClick = (answer: Answer) => {
    setSelectedAnswer(answer.id);
    adjustTemperature(answer.score);
    setTimeout(() => {
      onAnswer(answer.id);
      setSelectedAnswer(null);
    }, 300);
  };

  return (
    <div id="quiz-container">
      {showDoor && (
        <div className="door-overlay">
          <div className="door-scene">
            <div className="door-container">
              <div className="stone-arch"></div>
              <div className="stone-wall"></div>

              <div className="door-frame">
                <div className="interior"></div>

                <div className="door">
                  <div className="wood-planks"></div>

                  <div className="metal-bands">
                    <div className="band">
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                    </div>
                    <div className="band">
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                    </div>
                    <div className="band">
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                      <div className="rivet"></div>
                    </div>
                  </div>

                  <div className="knocker"></div>

                  <div className="door-handle">
                    <div className="handle-ring"></div>
                  </div>
                </div>

                <div className="mystical-light"></div>

                <div className="dust">
                  <div className="dust-particle"></div>
                  <div className="dust-particle"></div>
                  <div className="dust-particle"></div>
                  <div className="dust-particle"></div>
                  <div className="dust-particle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {content}
      <div className="quiz-wrapper">
        <div className="quiz-header">
          <div className="progress-info">
            <span className="progress-text">
              Question {currentQuestion} sur {totalQuestions}
            </span>
            <span className="progress-percentage">
              {Math.round(progressPercentage)}%
            </span>
          </div>

          <div className="circular-progress">
            <svg className="circular-progress-svg" viewBox="0 0 36 36">
              <path
                className="circular-progress-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="circular-progress-fill"
                strokeDasharray={`${progressPercentage}, 100`}
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="circular-progress-text">
              {currentQuestion}/{totalQuestions}
            </div>
          </div>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar-bg">
            <div
              className="progress-bar"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="progress-bar-glow"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="progress-steps">
            {Array.from({ length: totalQuestions }, (_, index) => (
              <div
                key={index}
                className={`progress-step ${
                  index < currentQuestion
                    ? "completed"
                    : index === currentQuestion - 1
                    ? "current"
                    : "pending"
                }`}
              />
            ))}
          </div>
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
                  onClick={() => handleAnswerClick(answer)}
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

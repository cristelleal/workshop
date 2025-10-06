import { useState, useEffect } from "react";
import "./results.css";

type Props = {
  playerName: string;
  totalQuestions: number;
  onBackToHome: () => void;
  answers?: string[];
  temperature?: number;
};

export default function Results({ 
  playerName, 
  totalQuestions, 
  onBackToHome, 
  answers = [],
  temperature = 15 
}: Props) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const correctAnswers = answers.filter(answer => answer === 'A' || answer === 'B').length;
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100);
    setScore(calculatedScore);
    
    if (calculatedScore >= 70) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [answers, totalQuestions]);

  const getScoreMessage = () => {
    if (score >= 90) return "Excellent ! 🌟";
    if (score >= 70) return "Très bien ! 🎉";
    if (score >= 50) return "Bien joué ! 👍";
    return "Continuez vos efforts ! 💪";
  };

  const getTemperatureMessage = () => {
    if (temperature <= 12) return "🌱 Excellent pour la planète !";
    if (temperature <= 18) return "🌿 Bon impact environnemental";
    if (temperature <= 25) return "⚠️ Impact modéré";
    return "🚨 Action urgente nécessaire !";
  };

  const getScoreColor = () => {
    if (score >= 90) return "#2ecc71";
    if (score >= 70) return "#f39c12";
    if (score >= 50) return "#e67e22";
    return "#e74c3c";
  };

  return (
    <div className="results-container">
      {showConfetti && (
        <div className="confetti-container">
          {Array.from({ length: 50 }, (_, i) => (
            <div key={i} className="confetti" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#2ecc71', '#f39c12', '#e67e22', '#3498db'][Math.floor(Math.random() * 4)]
            }} />
          ))}
        </div>
      )}
      
      <div className="results-content">
        <div className="results-header">
          <div className="results-icon">🏆</div>
          <h1 className="results-title">Quiz terminé !</h1>
          <p className="results-message">Félicitations {playerName} ! 🎉</p>
        </div>

        <div className="results-stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-label">Score</div>
            <div className="stat-value" style={{ color: getScoreColor() }}>
              {score}%
            </div>
            <div className="stat-message">{getScoreMessage()}</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">❓</div>
            <div className="stat-label">Questions</div>
            <div className="stat-value">{totalQuestions}</div>
            <div className="stat-message">Répondues</div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🌡️</div>
            <div className="stat-label">Température</div>
            <div className="stat-value">{temperature.toFixed(1)}°C</div>
            <div className="stat-message">{getTemperatureMessage()}</div>
          </div>
        </div>

        <div className="results-actions">
          <button className="results-button primary" onClick={onBackToHome}>
            <span className="button-icon">🏠</span>
            Retour à l'accueil
          </button>
          <button className="results-button secondary" onClick={() => window.location.reload()}>
            <span className="button-icon">🔄</span>
            Refaire le quiz
          </button>
        </div>
      </div>
    </div>
  );
}
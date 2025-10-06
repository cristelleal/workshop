import "./results.css";

type Props = {
  playerName: string;
  totalQuestions: number;
  onBackToHome: () => void;
};

export default function Results({ playerName, totalQuestions, onBackToHome }: Props) {
  return (
    <div className="results-container">
      <div className="results-content">
        <h1 className="results-title">Quiz terminé !</h1>
        <p className="results-message">Félicitations {playerName} ! 🎉</p>
        <p className="results-stats">
          Vous avez répondu à {totalQuestions} questions.
        </p>
        <button className="results-button" onClick={onBackToHome}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}
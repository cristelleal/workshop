import "./App.css";
import Homepage from "./components/homepage/homepage";
import Quiz from "./components/quiz/quiz";
import Results from "./components/results/results";
import { useQuizLogic } from "./hooks/useQuizLogic";

function App() {
  const {
    currentView,
    currentQuestionIndex,
    playerName,
    handleStartQuiz,
    handleAnswer,
    handleBackToHome,
    currentQuestion,
    totalQuestions,
  } = useQuizLogic();

  if (currentView === "quiz") {
    return (
      <Quiz
        question={currentQuestion}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        onAnswer={handleAnswer}
      />
    );
  }

  if (currentView === "results") {
    return (
      <Results
        playerName={playerName}
        totalQuestions={totalQuestions}
        onBackToHome={handleBackToHome}
      />
    );
  }

  return <Homepage onStart={handleStartQuiz} />;
}

export default App;

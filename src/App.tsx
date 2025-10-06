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
    answers,
    temperature,
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
        temperature={temperature}
      />
    );
  }

  if (currentView === "results") {
    return (
      <Results
        playerName={playerName}
        totalQuestions={totalQuestions}
        onBackToHome={handleBackToHome}
        answers={answers}
        temperature={temperature}
      />
    );
  }

  return <Homepage onStart={handleStartQuiz} />;
}

export default App;

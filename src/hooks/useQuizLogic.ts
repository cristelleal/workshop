import { useState } from "react";
import { quizQuestions } from "../data/quizData";

export type ViewType = "homepage" | "quiz" | "results";

export function useQuizLogic() {
  const [currentView, setCurrentView] = useState<ViewType>("homepage");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [temperature, setTemperature] = useState(15);

  const handleStartQuiz = (pseudo: string) => {
    setPlayerName(pseudo);
    setCurrentView("quiz");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTemperature(15);
  };

  const handleAnswer = (answerId: string) => {
    const newAnswers = [...answers, answerId];
    setAnswers(newAnswers);

    let temperatureChange = 0;

    if (answerId === "A" || answerId === "B") {
      temperatureChange = -1;
    } else {
      temperatureChange = +2;
    }

    const newTemperature = Math.min(
      Math.max(temperature + temperatureChange, 5),
      35
    );
    setTemperature(newTemperature);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentView("results");
    }
  };

  const handleBackToHome = () => {
    setCurrentView("homepage");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setTemperature(15);
  };

  return {
    currentView,
    currentQuestionIndex,
    playerName,
    answers,
    temperature,
    handleStartQuiz,
    handleAnswer,
    handleBackToHome,
    currentQuestion: quizQuestions[currentQuestionIndex],
    totalQuestions: quizQuestions.length,
  };
}
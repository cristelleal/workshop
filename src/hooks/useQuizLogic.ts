import { useState } from 'react';
import { quizQuestions } from '../data/quizData';

export type ViewType = 'homepage' | 'quiz' | 'results';

export function useQuizLogic() {
  const [currentView, setCurrentView] = useState<ViewType>('homepage');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [answers, setAnswers] = useState<string[]>([]);

  const handleStartQuiz = (pseudo: string) => {
    setPlayerName(pseudo);
    setCurrentView('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (answerId: string) => {
    const newAnswers = [...answers, answerId];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentView('results');
    }
  };

  const handleBackToHome = () => {
    setCurrentView('homepage');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  return {
    currentView,
    currentQuestionIndex,
    playerName,
    answers,
    handleStartQuiz,
    handleAnswer,
    handleBackToHome,
    currentQuestion: quizQuestions[currentQuestionIndex],
    totalQuestions: quizQuestions.length
  };
}
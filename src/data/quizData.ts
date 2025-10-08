export type Answer = {
  id: string;
  text: string;
  score: number;
};

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
};

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Quel gaz est principalement responsable de l'effet de serre ?",
    answers: [
      { id: "a", text: "Dioxyde de carbone (CO₂)", score: -0.5 },
      { id: "b", text: "Oxygène (O₂)", score: 0.5 },
      { id: "c", text: "Azote (N₂)" , score: 0.25},
      { id: "d", text: "Hélium (He)" , score: 0.25}
    ]
  },
  {
    id: 2,
    question: "Quelle est la principale source d'énergie renouvelable ?",
    answers: [
      { id: "a", text: "Le charbon", score: 0.5 },
      { id: "b", text: "Le pétrole", score: 0.5 },
      { id: "c", text: "L'énergie solaire", score: -0.5 },
      { id: "d", text: "Le gaz naturel", score: 0.25 }
    ]
  },
  {
    id: 3,
    question: "Combien de temps faut-il pour qu'un sac plastique se décompose ?",
    answers: [
      { id: "a", text: "1 an", score: 0.25 },
      { id: "b", text: "10 ans", score: -0.5 },
      { id: "c", text: "100 ans", score: 0.25 },
      { id: "d", text: "400-1000 ans", score: 0.5 }
    ]
  }
];
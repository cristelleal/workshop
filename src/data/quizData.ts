export type Answer = {
  id: string;
  text: string;
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
      { id: "a", text: "Dioxyde de carbone (CO₂)" },
      { id: "b", text: "Oxygène (O₂)" },
      { id: "c", text: "Azote (N₂)" },
      { id: "d", text: "Hélium (He)" }
    ]
  },
  {
    id: 2,
    question: "Quelle est la principale source d'énergie renouvelable ?",
    answers: [
      { id: "a", text: "Le charbon" },
      { id: "b", text: "Le pétrole" },
      { id: "c", text: "L'énergie solaire" },
      { id: "d", text: "Le gaz naturel" }
    ]
  },
  {
    id: 3,
    question: "Combien de temps faut-il pour qu'un sac plastique se décompose ?",
    answers: [
      { id: "a", text: "1 an" },
      { id: "b", text: "10 ans" },
      { id: "c", text: "100 ans" },
      { id: "d", text: "400-1000 ans" }
    ]
  }
];
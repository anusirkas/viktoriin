import type { Question } from "../types/QuizTypes";

export const questions: Question[] = [
  {
    question:
      "Milline oli 2024. aastal sündinud tüdrukute seas kõige populaarsem eesnimi?",
    options: ["Emilia", "Sofia", "Mia"],
    correctAnswer: "Sofia",
    fact: "Sofia on olnud kõige populaarsem tüdrukunimi Eestis juba 12 korda.",
  },
  {
    question:
      "Mitu lammast oli Eestis 2025. aasta neljandas kvartalis?",
    options: ["43 900", "67 500", "102 400"],
    correctAnswer: "43 900",
    fact: "Lambakasvatus on Eestis väike, kuid oluline osa põllumajandusest.",
  },
  {
    question:
      "Millises maakonnas oli 2025. aastal kõige madalam mediaanpalk?",
    options: ["Hiiu maakond", "Valga maakond", "Ida-Viru maakond"],
    correctAnswer: "Valga maakond",
    fact: "Valga maakonnas oli 2025. aastal mediaanpalk 1357 eurot, mis oli Eesti maakondadest madalaim.",
  },
];
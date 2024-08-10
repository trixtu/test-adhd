import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isDateInPast (date: Date) : boolean {
  const now = new Date();
  return date.getTime() < now.getTime();
}

export const getAdhdDescription = (inattentionScore:number, hyperactivityScore:number) => {

  console.log(hyperactivityScore)
  let inattentionLevel = "";
  let hyperactivityLevel = "";

  let scorGeneral, nivel, title, text;

  if (inattentionScore <= 12) {
    inattentionLevel = "Low level of inattention";
  } else if (inattentionScore <= 24) {
    inattentionLevel = "Moderate level of inattention";
  } else {
    inattentionLevel = "High level of carelessness";
  }

  if (hyperactivityScore <= 12) {
    hyperactivityLevel = "Low level of hyperactivity/impulsivity";
  } else if (hyperactivityScore <= 24) {
    hyperactivityLevel = "Moderate level of hyperactivity/impulsivity";
  } else {
    hyperactivityLevel = "High level of hyperactivity/impulsivity";
  }

  if ((inattentionScore + hyperactivityScore) / 72 < 0.33) {
    scorGeneral = 1.10;
    nivel = 5;
    title = "No ADHD";
    text = "No significant symptoms of ADHD detected.";
  } else if ((inattentionScore + hyperactivityScore) / 72 <= 0.33) {
    scorGeneral = 4.66;
    nivel = 22;
    title = "Mild ADHD";
    text = "Symptoms are mild and don't significantly interfere with daily life.";
  } else if ((inattentionScore + hyperactivityScore) / 72 <= 0.66) {
    scorGeneral = 11.23;
    nivel = 58;
    title = "Moderate ADHD";
    text = "Symptoms cause significant difficulties in daily life and social activities.";
  } else {
    scorGeneral = 19.55;
    nivel = 77;
    title = "Severe ADHD";
    text = "Symptoms are very intense, making it difficult to manage daily activities and requiring specialized interventions.";
  }

  return {
    generalLevel:{
      scorGeneral, 
      title,
      nivel,
      text
    },
    inattentionLevel,
    hyperactivityLevel
  }
};

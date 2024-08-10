"use client";

import { questions } from "@/data/questions";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CardFooter } from "../../_components/CardFooter";
import { Button } from "@/components/ui/button";
import { CardTitle } from "../../_components/CardTitle";
import { CardContent } from "../../_components/CardContent";
import { CheckCheckIcon, CheckIcon } from "lucide-react";
import { Card } from "../../_components/Card";
import Cookies from "js-cookie";

export const QuizzComponent = () => {
  const [answers, setAnswers] = useState(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem("quizAnswers");
      return savedAnswers
        ? JSON.parse(savedAnswers)
        : Array(questions.length).fill(2);
    }
    return Array(questions.length).fill(0);
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [value, setValue] = useState(2);
  const [progress, setProgress] = useState(0); // Progresul inițial
  const totalQuestions = 18; // Numărul total de întrebări
  const [isAnsweredByUser, setIsAnsweredByUser] = useState<boolean[]>(
    Array(questions.length).fill(false)
  );

  // Funcție pentru a calcula progresul și a-l rotunji
  const calculateProgress = (currentQuestion: any) => {
    const rawProgress = ((currentQuestion + 1) / totalQuestions) * 100;
    return Math.round(rawProgress);
  };

  const { push } = useRouter();

  // const { setScore, score } = useAppContext();

  // Load answers and isAnsweredByUser from localStorage after component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem("quizAnswers");
      const savedIsAnsweredByUser = localStorage.getItem("isAnsweredByUser");

      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers));
      }
      if (savedIsAnsweredByUser) {
        setIsAnsweredByUser(JSON.parse(savedIsAnsweredByUser));
      }
    }
  }, []);

  useEffect(() => {
    setValue(answers[currentQuestion]);
  }, [currentQuestion, answers]);

  useEffect(() => {
    // Actualizare progres
    setProgress(calculateProgress(currentQuestion));
  }, [currentQuestion]);

  const handleUserAnswer = () => {
    setIsAnsweredByUser((prev: any) => {
      const newIsAnsweredByUser = [...prev];
      newIsAnsweredByUser[currentQuestion] = true;
      localStorage.setItem(
        "isAnsweredByUser",
        JSON.stringify(newIsAnsweredByUser)
      );
      return newIsAnsweredByUser;
    });
  };

  const handleNavigation = (direction: any) => {
    setAnswers((prev: any) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = value;
      localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
      return newAnswers;
    });

    if (direction === "next") {
      setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    } else if (direction === "prev") {
      setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    }
  };

  const calculateScore = (answers: number[]) => {
    let inattentionScore = 0;
    let hyperactivityScore = 0;
    let inattentionMaxScore = 0;
    let hyperactivityMaxScore = 0;

    questions.forEach((question, index) => {
      const answerValue = answers[index];
      const maxPoints = 4;

      if (question.category === "Neatenție") {
        inattentionScore += answerValue;
        inattentionMaxScore += maxPoints;
      } else if (question.category === "Hiperactivitate/Impulsivitate") {
        hyperactivityScore += answerValue;
        hyperactivityMaxScore += maxPoints;
      }
    });

    let totalScore = inattentionScore + hyperactivityScore;
    let totalMaxScore = inattentionMaxScore + hyperactivityMaxScore;
  

    // Salvare scor în cookies
    Cookies.set(
      "score",
      JSON.stringify({
        totalScore,
        totalMaxScore,
        inattentionScore,
        inattentionMaxScore,
        hyperactivityScore,
        hyperactivityMaxScore,
      }),
      {
        expires: 10 / 1440,
      } // 10 minute exprimate în zile (1 zi = 1440 minute)
    );
  };

  const handleSubmit = async () => {
    setAnswers((prev: any) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = value;
      localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
      return newAnswers;
    });

    calculateScore(answers)

    push("/adhd/pay");
  };

  return (
    <>
      <div className="w-full md:w-[592px] bg-neutral-200 dark:bg-neutral-600 rounded-lg overflow-hidden mt-2">
        <div
          className="bg-primary p-0.5 text-center text-xs font-medium leading-none text-white"
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
      <Card>
        <CardTitle title={`Question ${currentQuestion + 1}/18`} />

        <CardContent content={questions[currentQuestion].question.label}>
          <div className="flex flex-col  ">
            <div className="grow flex justify-center items-center w-full h-[100px] my-4 px-2 rounded-lg">
              <div className="flex justify-center items-center h-full space-y-12 md:space-y-0">
                <form className="flex justify-center w-full">
                  <div className="w-[380px] relative space-y-2">
                    <div className="relative h-6 bg-neutral-200 rounded-lg">
                      <div
                        style={{
                          left: `${value * 25}%`,
                          transform: "translate(-20px, -20px)",
                        }}
                        className="absolute z-20 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 bg-white rounded-full shadow-xl border top-1/2"
                      >
                        <div
                          style={{
                            display:
                              isAnsweredByUser &&
                              isAnsweredByUser[currentQuestion] === true
                                ? "inherit"
                                : "none",
                          }}
                        >
                          <CheckIcon className="w-6 h-6 p-1 text-white font-bold bg-primary rounded-full" />
                        </div>
                      </div>

                      <div
                        style={{ width: `${value * 25}%` }}
                        className="absolute top-0 left-0 z-10 w-1/2 h-full transition-all bg-primary bg-opacity-90 rounded-lg"
                      ></div>

                      <div className="absolute top-0 left-0 z-10 grid w-full h-full grid-cols-4">
                        <div className="relative"></div>
                        <div className="relative">
                          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2">
                            <div
                              className={`border-2 border-gray-100 rounded-full ${
                                value >= 1
                                  ? "w-1.5 h-1.5 bg-white"
                                  : "w-2.5 h-2.5 bg-gray-200"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2">
                            <div
                              className={`border-2 border-gray-100 rounded-full ${
                                value >= 2
                                  ? "w-1.5 h-1.5 bg-white"
                                  : "w-2.5 h-2.5 bg-gray-200"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="absolute -left-2.5 top-1/2 -translate-y-1/2">
                            <div
                              className={`border-2 border-gray-100 rounded-full ${
                                value >= 3
                                  ? "w-1.5 h-1.5 bg-white"
                                  : "w-2.5 h-2.5 bg-gray-200"
                              }`}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute w-full border-b border-gray-200 top-1/2"></div>
                    </div>

                    <div className="absolute top-0 left-0 z-50 grid w-full h-full grid-cols-10">
                      {[0, 1, 2, 3, 4].map((val, index) => (
                        <div
                          key={val}
                          onClick={() => {
                            setValue(val);
                            handleUserAnswer();
                          }}
                          className={`p-2 cursor-pointer ${
                            index !== 0 && index !== 4
                              ? "[&_p]:text-center col-span-2"
                              : ""
                          } ${index === 0 ? "md:-ml-[50%] col-span-2" : ""} ${
                            value === index ? "text-gray-900" : ""
                          } ${
                            index === 4 ? "[&_p]:float-right col-span-2" : ""
                          }`}
                        ></div>
                      ))}
                    </div>

                    <div className="grid w-full grid-cols-5 text-xs text-gray-400 capitalize [&_p]:transition-all whitespace-nowrap">
                      {questions[currentQuestion].responses.choix.map(
                        (label, index) => (
                          <div
                            key={index}
                            className={`cursor-pointer px-2 py-1 text-center ${
                              index !== 0 && index !== 4 ? "text-center" : ""
                            } ${index === 0 ? "" : ""} ${
                              value === index
                                ? "text-gray-900 font-semibold"
                                : ""
                            } ${index === 4 ? "float-right" : ""}`}
                          >
                            <p>{label}</p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </form>

                {/* <div
            className={`flex items-center w-full ${
              currentQuestion === 0 ? "justify-end" : "justify-between"
            }`}
          >
            <button
              onClick={() => handleNavigation("prev")}
              className={`btn btn-neutral btn-sm ${
                currentQuestion === 0 ? "hidden" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14 16L10 12L14 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                ></path>
              </svg>
              Back
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => handleNavigation("next")}
                className="btn btn-primary text-white btn-sm float-end"
                disabled={
                  isAnsweredByUser && isAnsweredByUser[currentQuestion] !== true
                    ? true
                    : false
                }
              >
                Next
                <svg
                  className="text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 16L14 12L10 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={
                  isAnsweredByUser && isAnsweredByUser[currentQuestion] !== true
                    ? true
                    : false
                }
                className={"btn btn-success btn-sm text-white"}
              >
                Get My Results
                <svg
                  className="text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 16L14 12L10 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </button>
            )}
          </div> */}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div
            className={`flex items-center w-full ${
              currentQuestion === 0 ? "justify-end" : "justify-between"
            }`}
          >
            <Button
              onClick={() => handleNavigation("prev")}
              variant={"secondary"}
              className={`btn btn-neutral btn-sm ${
                currentQuestion === 0 ? "hidden" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M14 16L10 12L14 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="square"
                ></path>
              </svg>
              Back
            </Button>
            {currentQuestion < questions.length - 1 ? (
              <Button
                onClick={() => handleNavigation("next")}
                disabled={
                  isAnsweredByUser && isAnsweredByUser[currentQuestion] !== true
                    ? true
                    : false
                }
              >
                Next
                <svg
                  className="text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 16L14 12L10 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                variant={"success"}
                disabled={
                  isAnsweredByUser && isAnsweredByUser[currentQuestion] !== true
                    ? true
                    : false
                }
                className={"btn btn-success btn-sm text-white"}
              >
                Get My Results
                <svg
                  className="text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M10 16L14 12L10 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                  ></path>
                </svg>
              </Button>
            )}
          </div>

        
        </CardFooter>
      </Card>
      
      <div className="grid grid-cols-10 grid-rows-2 gap-2 py-2 w-fit btn-quizz">
        {answers.map((val: any, index: number) => (
          <Button
            key={index}
            className={`px-3 py-1 ${
              currentQuestion === index
                ? "bg-primary hover:bg-primary/90 text-white hover:text-white"
                : currentQuestion > index
                ? "bg-violet-200 text-violet-900 hover:bg-violet-200/90 border"
                : "btn-unseen"
            }`}
            variant={'outline'}
            onClick={() => setCurrentQuestion(index)}
            disabled={currentQuestion < index}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </> 
  );
};

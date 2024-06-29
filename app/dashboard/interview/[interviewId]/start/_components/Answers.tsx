"use client";

import { Button } from "@/components/ui/button";
import { StopCircle, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { mockInterviewProps, mockInterviewResponseProps } from "@/types/type";
import { chatSession } from "@/database/GeminiAiModal";
import { db } from "@/database";
import { UserAnswer } from "@/database/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const Answers = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  interviewData,
}: {
  mockInterviewQuestions: mockInterviewResponseProps[];
  activeQuestionIndex: number;
  interviewData: mockInterviewProps | undefined;
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result: any) => {
      setUserAnswer((prevAnswer) => prevAnswer + result?.transcript);
    });
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      setLoading(true);
      stopSpeechToText();
      if (userAnswer.length < 10) {
        toast("Answer is too short, please try again", {
          closeButton: true,
        });
        return;
      }
      const feedBackPrompt = `Question: ${mockInterviewQuestions[activeQuestionIndex]?.question} , Answer: ${userAnswer}. Based on the question and answer, provide feedback to the candidate. You have to rate the answer on a scale of 1 to 5. 1 being the lowest and 5 being the highest. You have to provide feedback in the json format. For example: { "rating": 5, "feedback": "Great answer, you nailed it!" }. Limit the feedback to 80 characters which includes area of improvement, mistakes etc too.`;

      const result = await chatSession.sendMessage(feedBackPrompt);
      const refactoredResult = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const jsonResult = JSON.parse(refactoredResult);

      const response = await db.insert(UserAnswer).values({
        mockInterviewIdRef: interviewData?.mockInterviewId!,
        question: mockInterviewQuestions[activeQuestionIndex]?.question,
        correctAnswer: mockInterviewQuestions[activeQuestionIndex]?.answer,
        userAnswer: userAnswer,
        feedback: jsonResult.feedback,
        rating: jsonResult.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-YYYY"),
      });

      if (response) {
        toast("Answer recorded successfully", {
          closeButton: true,
        });
      }

      setUserAnswer("");
      setLoading(false);
    } else {
      startSpeechToText();
    }
  };

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center rounded-lg bg-secondary p-5">
        <WebcamIcon width={200} height={200} className="absolute" />
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 100,
          }}
          mirrored={true}
          className="my-7 p-0"
        />
      </div>

      <Button
        variant="outline"
        className="my-10 border-primary text-primary"
        onClick={saveUserAnswer}
      >
        {isRecording ? (
          <h2 className="flex animate-pulse items-center gap-1 font-bold text-red-600">
            <StopCircle size={20} /> Stop Recording
          </h2>
        ) : (
          <h2 className="font-bold">Record Answer</h2>
        )}
      </Button>
    </div>
  );
};

export default Answers;

"use client";

import { db } from "@/database";
import { eq } from "drizzle-orm";
import { UserAnswer } from "@/database/schema";
import { useEffect, useState } from "react";
import { feedbackListProps } from "@/types/type";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type FeedBackProps = {
  params: {
    interviewId: string;
  };
};

const FeedBack = ({ params }: FeedBackProps) => {
  const route = useRouter();
  const [feedbackList, setFeedBackList] = useState<feedbackListProps[]>([]);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [totalRating, setTotalRating] = useState<number>(0);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockInterviewIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    setFeedBackList(result);
    calculatetotalRating(result);
  };

  const toggleCollapsible = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const calculatetotalRating = (feedback: feedbackListProps[]) => {
    if (feedback.length == 0) {
      setTotalRating(0);
      return;
    }
    const totalRating = feedback.reduce(
      (sum, item) => sum + (parseInt(item.rating!) || 0),
      0,
    );

    setTotalRating(totalRating);
  };

  useEffect(() => {
    getFeedback();
  }, [params.interviewId]);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations!</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback</h2>
      <h2 className="mt-3 text-lg text-primary">
        Your overall rating is: <strong>{totalRating}/50</strong>
      </h2>
      <h2 className="text-lg text-blue-400">
        Attempted Questions: <strong>{feedbackList.length}/10</strong>
      </h2>
      <h2>
        Below, you’ll find your interview questions along with the correct
        answer, and feedback for improvement.
      </h2>

      {feedbackList &&
        feedbackList.map((data, index) => (
          <Collapsible key={index} className="w-full">
            <CollapsibleTrigger
              className="my-2 flex w-full justify-between rounded-lg bg-secondary p-2 text-left"
              onClick={() => toggleCollapsible(index)}
            >
              {data.question}
              <div>
                <ChevronDown
                  className={cn(openIndexes.includes(index) && "hidden")}
                />
                <ChevronUp
                  className={cn(!openIndexes.includes(index) && "hidden")}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-2">
              <p className="rounded-sm border border-red-300 bg-red-100 p-2">
                <strong className="mt-1">Your answer:</strong>
                <br /> {data.userAnswer}
              </p>
              <p className="mt-2 rounded-sm border border-green-300 bg-green-100 p-2">
                <strong className="mt-1">Correct Answer:</strong>
                <br /> {data.correctAnswer}
              </p>
              <p className="mt-2 rounded-sm border border-blue-300 bg-blue-100 p-2">
                <strong className="mt-1">Feedback:</strong>
                <br /> {data.feedback}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      <Button className="mt-2" onClick={() => route.replace("/dashboard")}>
        Go Home
      </Button>
    </div>
  );
};

export default FeedBack;

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

type FeedBackProps = {
  params: {
    interviewId: string;
  };
};

const FeedBack = ({ params }: FeedBackProps) => {
  const [feedbackList, setFeedBackList] = useState<feedbackListProps[]>([]);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockInterviewIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedBackList(result);
  };

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-500">Congratulations</h2>
      <h2 className="text-2xl font-bold">Here is your interview feedback</h2>
      <h2 className="my-3 text-lg text-primary">
        Your overall rating is: <strong></strong>
      </h2>
      <h2>
        Below, you’ll find your interview questions along with the correct
        answer, and feedback for improvement.
      </h2>

      {feedbackList &&
        feedbackList.map((data, index) => (
          <Collapsible key={index}>
            <CollapsibleTrigger className="my-2 rounded-lg bg-secondary p-2 text-left">
              {data.question}
              <ChevronDown />
              <ChevronUp />
            </CollapsibleTrigger>
            <CollapsibleContent></CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  );
};

export default FeedBack;

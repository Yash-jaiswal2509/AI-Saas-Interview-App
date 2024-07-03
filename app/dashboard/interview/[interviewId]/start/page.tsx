"use client";

import { db } from "@/database";
import { mockInterviewSchema } from "@/database/schema";
import { mockInterviewProps, mockInterviewResponseProps } from "@/types/type";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import Questions from "./_components/Questions";
import Answers from "./_components/Answers";

const StartInterview = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<mockInterviewProps>();

  const [mockInterviewQuestions, setMockInterviewQuestions] = useState<
    mockInterviewResponseProps[]
  >([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  const getInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(eq(mockInterviewSchema.mockInterviewId, params.interviewId));

    const parsedResult: mockInterviewResponseProps[] = JSON.parse(
      result[0].jsonMockResponse,
    );
    setMockInterviewQuestions(parsedResult);
    setInterviewData(result[0]);
  };

  useEffect(() => {
    getInterviewDetails();
  }, [interviewData, getInterviewDetails]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
      {/* {mockInterviewQuestions?.map((data, index) => (
        <>
          <div key={index}>{data?.question}</div>
          <div key={index}>{data?.answer}</div>
        </>
      ))} */}
      <Questions
        activeQuestionIndex={activeQuestionIndex}
        mockInterviewQuestions={mockInterviewQuestions}
        setActiveQuestionIndex={setActiveQuestionIndex}
      />

      <Answers
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestionIndex={activeQuestionIndex}
        setActiveQuestionIndex={setActiveQuestionIndex}
        interviewData={interviewData}
      />
    </div>
  );
};

export default StartInterview;

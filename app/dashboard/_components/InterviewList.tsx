"use client";

import { db } from "@/database";
import { mockInterviewSchema } from "@/database/schema";
import { mockInterviewProps } from "@/types/type";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

const InterviewList = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState<mockInterviewProps[]>([]);

  const GetInterviewList = async () => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(
        eq(
          mockInterviewSchema.createdBy!,
          user?.primaryEmailAddress?.emailAddress!,
        ),
      )
      .orderBy(desc(mockInterviewSchema.id));

    setInterviewList(result);
  };

  useEffect(() => {
    user && GetInterviewList();
  }, [user, GetInterviewList]);

  return (
    <div>
      <h2 className="mt-4 text-xl font-medium">Previous Mock Interviews</h2>
      <div className="my-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {interviewList &&
          interviewList.map((interview, index) => (
            <InterviewCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
};

export default InterviewList;

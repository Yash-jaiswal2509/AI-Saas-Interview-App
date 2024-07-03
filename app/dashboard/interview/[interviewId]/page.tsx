"use client";

import { db } from "@/database";
import { mockInterviewSchema } from "@/database/schema";
import { eq } from "drizzle-orm";
import WebCam from "react-webcam";
import { useEffect, useState } from "react";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { mockInterviewProps } from "@/types/type";

const Page = ({ params }: { params: { interviewId: string } }) => {
  const [interviewData, setInterviewData] = useState<mockInterviewProps>();
  const [webCamEnabled, setWebCamEnabled] = useState(false);

  const getinterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterviewSchema)
      .where(eq(mockInterviewSchema.mockInterviewId, params.interviewId));

    setInterviewData(result[0]);
  };

  useEffect(() => {
    getinterviewDetails();
  },[interviewData]);

  return (
    <div className="my-10">
      <h2 className="text-center text-2xl font-bold">Let's Get Started</h2>
      <div className="grid grid-cols-1 gap-10 p-5 md:grid-cols-2">
        <div className="my-5 flex flex-col gap-3">
          <div className="flex flex-col gap-2 rounded-lg border border-primary p-2">
            <h2 className="text-base">
              <strong className="mr-1">Job Role/Job Position:</strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-base">
              <strong className="mr-1">Job Description/Job Tech Stcak:</strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-base">
              <strong className="mr-1">Year of Experience:</strong>
              {interviewData?.jobExperience}
            </h2>
          </div>

          <div className="rounded-lg border border-primary bg-primary/10 p-5">
            <h2 className="flex items-center gap-1">
              <Lightbulb color="#e11d48" fill="#e11d48" size="20" />
              <strong className="text-primary/90">Information</strong>
            </h2>
            <p className="mt-2 text-sm">
              Enable your webcam and microphone to start the AI-powered mock
              interview, consisting of 10 questions. Upon completion, you will
              receive a detailed report based on your responses.
              <b className="ml-1 text-primary">
                Please note: Your video is never recorded, and you may disable
                webcam access at any time if you choose.
              </b>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center">
          {webCamEnabled ? (
            <>
              <WebCam
                audio={true}
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                style={{
                  height: 288,
                  width: "150%",
                  borderRadius: "10px",
                }}
                mirrored={true}
                className="my-7 p-0"
              />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebCamEnabled(false)}
              >
                Disable Web Cam and Mic Phone
              </Button>
            </>
          ) : (
            <>
              <WebcamIcon className="my-6 h-72 w-full rounded-lg border bg-secondary p-20" />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setWebCamEnabled(true)}
              >
                Enable Web Cam and Mic Phone
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;

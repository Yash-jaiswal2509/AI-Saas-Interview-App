"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/database";
import { chatSession } from "@/database/GeminiAiModal";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { mockInterviewSchema } from "@/database/schema";

type mockInterviewProps = {
  mockInterviewId: string;
  jsonMockResponse: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt?: string;
};

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<String>();
  const [jobDescrition, setJobDescrition] = useState<String>();
  const [jobExperience, setJobExperience] = useState<String>();
  const [jsonResponse, setJsonResponse] = useState<any>([]);
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const InputPrompt = `Job position: ${jobPosition}, Job Description ${jobDescrition}, Year of Experience: ${jobExperience}. According to above given instructions make ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with their answers in json format. Create seperate field for the question and answer in the json`;

    console.log(jobDescrition, jobExperience, jobPosition);
    const result = await chatSession.sendMessage(InputPrompt);
    const refactoredResult = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(refactoredResult));
    setJsonResponse(refactoredResult);

    if(r)

    const response = await db
      .insert(mockInterviewSchema)
      .values({
        mockInterviewId: uuidv4(),
        jsonMockResponse: refactoredResult,
        jobPosition: jobPosition,
        jobDesc: jobDescrition,
        jobExperience: jobExperience,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD-MM-yyyy"),
      })
      .returning({
        mockInterviewId: mockInterviewSchema.mockInterviewId,
      });
    setLoading(false);

    console.log("Id:", response);
  };

  return (
    <div>
      <div className="cursor-pointer rounded-lg border bg-secondary p-10 transition-all hover:scale-95 hover:shadow-md">
        <h2 onClick={() => setOpenDialog(true)} className="text-center text-lg">
          + Add New
        </h2>
        <Dialog open={openDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={onSubmit}>
                  <h2 className="text-sm">
                    Add details about jop position/role, Job description and
                    years of experience
                  </h2>
                  <div className="my-3 mt-7">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/tech Stack</label>
                    <Textarea
                      placeholder="Ex. React, Angular, Node.Js, Next.js"
                      required
                      onChange={(event) => setJobDescrition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Yeras of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max="45"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="mt-5 flex justify-end gap-5">
                    <Button
                      type="button"
                      variant="ghost"
                      className="bg-slate-100"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      Start Interview
                      <Loader
                        className={cn(
                          "hidden h-6 w-6 animate-spin text-white",
                          loading && "block",
                        )}
                      />
                    </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNewInterview;

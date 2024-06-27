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
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<string>("");
  const [jobDescrition, setJobDescrition] = useState<string>("");
  const [jobExperience, setJobExperience] = useState<string>("");
  const [jsonResponse, setJsonResponse] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    try {
      const InputPrompt = `Job position: ${jobPosition}, Job Description ${jobDescrition}, Year of Experience: ${jobExperience}. According to above given instructions make ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with their answers in json format. Create separate field for the question and answer in the json`;

      const result = await chatSession.sendMessage(InputPrompt);
      const refactoredResult = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");
      setJsonResponse(refactoredResult);

      const response = await db
        .insert(mockInterviewSchema)
        .values({
          mockInterviewId: uuidv4(),
          jsonMockResponse: refactoredResult,
          jobPosition: jobPosition,
          jobDesc: jobDescrition,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress || "",
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({
          mockInterviewId: mockInterviewSchema.mockInterviewId,
        });

      setLoading(false);
      console.log("Id:", response);

      if (response) {
        router.push(`/dashboard/interview/${response[0]?.mockInterviewId}`);
      }
      
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
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
                    Add details about job position/role, Job description and
                    years of experience
                  </h2>
                  <div className="my-3 mt-7">
                    <label>Job Role/Job Position</label>
                    <Input
                      className="my-1"
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/tech Stack</label>
                    <Textarea
                      className="my-1"
                      placeholder="Ex. React, Angular, Node.Js, Next.js"
                      required
                      onChange={(event) => setJobDescrition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      className="my-1"
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

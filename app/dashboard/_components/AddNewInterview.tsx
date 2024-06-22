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
import { useState } from "react";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [jobPosition, setJobPosition] = useState<String>();
  const [jobDescrition, setJobDescrition] = useState<String>();
  const [jobExperience, setJobExperience] = useState<String>();

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
                <form>
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
                    <Button type="submit">Start Interview</Button>
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

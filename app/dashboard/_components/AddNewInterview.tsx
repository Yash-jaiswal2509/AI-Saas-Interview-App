"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div className="cursor-pointer rounded-lg border bg-secondary p-10 transition-all hover:scale-95 hover:shadow-md">
        <h2 onClick={() => setOpenDialog(true)} className="text-center text-lg">
          + Add New
        </h2>
        <Dialog open={openDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl text-primary font-bold">
                Tell us more about your job interviewing
              </DialogTitle>
              <DialogDescription>
                  <h2 className="text-sm">
                    Add details about jop position/role, Job description and
                    years of experience
                  </h2>
                <div className="flex mt-4 justify-end gap-5">
                  <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button>Start Interview</Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNewInterview;

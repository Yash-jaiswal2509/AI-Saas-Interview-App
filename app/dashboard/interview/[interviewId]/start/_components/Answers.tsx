"use client";

import { Button } from "@/components/ui/button";
import { Mic, WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { useEffect, useState } from "react";

const Answers = () => {
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
        className="my-10"
        onClick={isRecording ? stopSpeechToText : startSpeechToText}
      >
        {isRecording ? (
          <h2 className="flex items-center justify-between text-red-600">
            <Mic /> Recording...
          </h2>
        ) : (
          <h2>Record Answer</h2>
        )}
      </Button>
    </div>
  );
};

export default Answers;

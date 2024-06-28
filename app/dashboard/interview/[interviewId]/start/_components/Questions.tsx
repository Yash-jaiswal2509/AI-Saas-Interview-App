import { cn } from "@/lib/utils";
import { mockInterviewResponseProps } from "@/types/type";
import { Lightbulb, Volume2 } from "lucide-react";

interface QuestionsProps {
  mockInterviewQuestions: mockInterviewResponseProps[];
  activeQuestionIndex: number;
  setActiveQuestionIndex: (index: number) => void;
}

const Questions = ({
  mockInterviewQuestions,
  activeQuestionIndex,
  setActiveQuestionIndex,
}: QuestionsProps) => {
  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 1;
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else {
      alert("Speech synthesis not supported");
    }
  };

  return (
    <div className="rounded-lg border p-5">
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {mockInterviewQuestions &&
          mockInterviewQuestions.map((data, index) => (
            <>
              <h2
                onClick={() => setActiveQuestionIndex(index)}
                className={cn(
                  "cursor-pointer text-nowrap rounded-full bg-secondary p-2 text-center text-xs font-bold md:text-sm",
                  activeQuestionIndex == index && "bg-primary text-white",
                )}
              >
                Question: {index + 1}
              </h2>
            </>
          ))}
      </div>
      <h2 className="mt-6 text-sm md:text-base">
        {mockInterviewQuestions[activeQuestionIndex]?.question}
      </h2>

          
      <Volume2
        className="cursor-pointer mt-2"
        size={26}
        onClick={() =>
          textToSpeech(mockInterviewQuestions[activeQuestionIndex]?.question)
        }
      />

      <div className="mt-24 rounded-lg border bg-primary/10 p-5">
        <h2 className="flex items-center gap-2 text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className="my-2 text-sm text-primary">
          Please click on "Record Answer" when you are ready to respond to the
          questions. At the conclusion of the interview, we will provide
          feedback, including the correct answers for each question and a
          comparison with your responses.
        </h2>
      </div>
    </div>
  );
};

export default Questions;

import { Button } from "@/components/ui/button";
import { mockInterviewProps } from "@/types/type";
import { useRouter } from "next/navigation";

const InterviewCard = ({ interview }: { interview: mockInterviewProps }) => {
  const router = useRouter();
  return (
    <div className="rounded-lg border p-3 shadow-sm">
      <h2 className="font-bold text-primary">{interview.jobPosition}</h2>
      <h2 className="mt-1 text-sm text-gray-500">
        Years of expeirence: {interview.jobExperience}
      </h2>
      <h2 className="mt-1 text-xs text-gray-400">
        Created At: {interview.createdAt}
      </h2>
      <div className="mt-4 flex justify-between gap-4">
        <Button
          size="sm"
          variant="outline"
          className="w-full"
          onClick={() =>
            router.push(
              `/dashboard/interview/${interview.mockInterviewId}/feedback`,
            )
          }
        >
          Feedback
        </Button>
        <Button
          size="sm"
          onClick={() =>
            router.push(
              `/dashboard/interview/${interview.mockInterviewId}/start`,
            )
          }
          className="w-full"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default InterviewCard;

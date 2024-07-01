export type mockInterviewProps = {
  mockInterviewId: string;
  jsonMockResponse: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdAt: string | null;
  createdBy: string;
};

export interface mockInterviewResponseProps {
  question: string;
  answer: string;
}

export interface feedbackListProps {
  id: number;
  createdAt: string | null;
  mockInterviewIdRef: string;
  question: string;
  correctAnswer: string | null;
  userAnswer: string | null;
  feedback: string | null;
  rating: string | null;
  userEmail: string | null;
}

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

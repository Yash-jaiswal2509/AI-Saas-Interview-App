import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const mockInterviewSchema = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("json_mock_response").notNull(),
  jobPosition: varchar("job_position").notNull(),
  jobDesc: varchar("job_desc").notNull(),
  jobExperience: varchar("job_experience").notNull(),
  createdBy: varchar("created_by").notNull(),
  createdAt: varchar("created_at"),
  mockInterviewId: varchar("mock_interview_id").notNull(),
});

export const UserAnswer = pgTable("user_answer", {
  id: serial("id").primaryKey(),
  mockInterviewIdRef: varchar("mock_interview_id").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: text("correct_answer"),
  userAnswer: text("user_answer"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("user_email"),
  createdAt: varchar("created_at"),
});

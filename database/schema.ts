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

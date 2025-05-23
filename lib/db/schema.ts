import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  reachId: varchar("reachId", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 20 }).notNull().default("member"),
  groupId: integer("group_id").references(() => groups.id),
  completedOnboarding: boolean("completed_onboarding").default(false),
  companyName: varchar("company_name", { length: 150 }).notNull(),
  schoolDistrict: varchar("school_district", { length: 150 }),
  taxId: varchar("tax_id", { length: 100 }).notNull(),
  department: varchar("department", { length: 100 }),
  jobTitle: varchar("job_title", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  website: varchar("website", { length: 255 }),
  street: varchar("street", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  zipCode: varchar("zip_code", { length: 20 }).notNull(),

  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  deletedAt: timestamp("deleted_at"),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  stripeCustomerId: text("stripe_customer_id").unique(),
  stripeSubscriptionId: text("stripe_subscription_id").unique(),
  stripeProductId: text("stripe_product_id"),
  planName: varchar("plan_name", { length: 50 }),
  subscriptionStatus: varchar("subscription_status", { length: 20 }),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
});

export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many, one }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
  group: one(groups, {
    fields: [users.groupId],
    references: [groups.id],
  }),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.id],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

// -------------------
// Supporting Tables
// -------------------

export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  title: text("title"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const speakerNotes = pgTable("speaker_notes", {
  id: serial("id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const classroomPowerpoints = pgTable("classroom_powerpoints", {
  id: serial("id").primaryKey(),
  fileUrl: text("file_url").notNull(),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

// -------------------
// Main Presentations Table
// -------------------

export const classroomPresentations = pgTable("classroom_presentations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  courseUrl: text("course_url"),
  imageUrl: text("image_url"),
  videoId: integer("video_id").references(() => videos.id),
  speakerNotesId: integer("speaker_notes_id").references(() => speakerNotes.id),
  presentationPowerpointId: integer("presentation_powerpoint_id").references(
    () => classroomPowerpoints.id
  ),

  createdAt: timestamp("created_at").defaultNow(),
});

// -------------------
// Handouts Table (One-to-Many)
// -------------------

export const handouts = pgTable("handouts", {
  id: serial("id").primaryKey(),
  classroomPresentationId: integer("classroom_presentation_id")
    .references(() => classroomPresentations.id)
    .notNull(),
  fileUrl: text("file_url").notNull(),
  title: text("title"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const classroomPresentationRelations = relations(
  classroomPresentations,
  ({ one, many }) => ({
    video: one(videos, {
      fields: [classroomPresentations.videoId],
      references: [videos.id],
    }),
    speakerNotes: one(speakerNotes, {
      fields: [classroomPresentations.speakerNotesId],
      references: [speakerNotes.id],
    }),
    powerpoint: one(classroomPowerpoints, {
      fields: [classroomPresentations.presentationPowerpointId],
      references: [classroomPowerpoints.id],
    }),
    handouts: many(handouts),
  })
);

export const handoutsRelations = relations(handouts, ({ one }) => ({
  presentation: one(classroomPresentations, {
    fields: [handouts.classroomPresentationId],
    references: [classroomPresentations.id],
  }),
}));

export const groupsRelations = relations(groups, ({ many }) => ({
  users: many(users),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, "id" | "name" | "email">;
  })[];
};
export type Video = typeof videos.$inferSelect;
export type Group = typeof groups.$inferSelect;
export type NewGroup = typeof groups.$inferInsert;

export enum ActivityType {
  SIGN_UP = "SIGN_UP",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
  UPDATE_PASSWORD = "UPDATE_PASSWORD",
  DELETE_ACCOUNT = "DELETE_ACCOUNT",
  UPDATE_ACCOUNT = "UPDATE_ACCOUNT",
  CREATE_TEAM = "CREATE_TEAM",
  REMOVE_TEAM_MEMBER = "REMOVE_TEAM_MEMBER",
  INVITE_TEAM_MEMBER = "INVITE_TEAM_MEMBER",
  ACCEPT_INVITATION = "ACCEPT_INVITATION",
}

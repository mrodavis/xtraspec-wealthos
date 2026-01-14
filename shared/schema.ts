import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  riskLevel: text("risk_level").notNull(), // 'Low', 'Medium', 'High'
  reviewStatus: text("review_status").notNull(), // 'Complete', 'Due', 'Overdue'
  lifeEventFlag: boolean("life_event_flag").default(false),
  netWorth: text("net_worth").notNull(),
  primaryGoal: text("primary_goal").notNull(),
  portfolioValue: text("portfolio_value"),
  lastContactDate: text("last_contact_date"),
  email: text("email"),
});

export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  clientName: text("client_name").notNull(),
  eventType: text("event_type").notNull(), // 'Marriage', 'Divorce', 'Business', etc.
  detectionSource: text("detection_source").notNull(),
  date: text("date").notNull(),
  isRead: boolean("is_read").default(false),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull(),
  clientName: text("client_name").notNull(),
  activityType: text("activity_type").notNull(), // 'Meeting', 'Recommendation', etc.
  date: text("date").notNull(),
  status: text("status").notNull(),
});

export const insertClientSchema = createInsertSchema(clients).omit({ id: true });
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true });
export const insertActivitySchema = createInsertSchema(activities).omit({ id: true });

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Alert = typeof alerts.$inferSelect;
export type Activity = typeof activities.$inferSelect;

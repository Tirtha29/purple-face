import { 
  index,
  pgTable,
  uuid,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { topics } from "./topic.schema";
import { users } from "./user.schema";

export const threads = pgTable("thread", {
  id: uuid("id").primaryKey().notNull().unique(),

  topicId: uuid("topic_id").references(() => topics.id).notNull(),

  viewCount: integer("view_count"),
  threadTitle: varchar("thread_title", { length: 255 }),

  createdAt: timestamp("created_at", { mode: "string" }).notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }),
  deletedAt: timestamp("deleted_at", { mode: "string" }),

  createdBy: uuid("created_by").references(() => users.id).notNull(),
  updatedBy: uuid("updated_by").references(() => users.id),
  deletedBy: uuid("deleted_by").references(() => users.id),

  pinnedAt: timestamp("pinned_at", { mode: "string" }),
  isLocked: boolean("is_locked").default(false),
},
  (table) => [
      index("idx_view_count").on(table.viewCount),
      index("idx_thread_created_by").on(table.createdBy),
      index("idx_thread_updated_by").on(table.updatedBy),
      index("idx_thread_created_at").on(table.createdAt),
  ]);

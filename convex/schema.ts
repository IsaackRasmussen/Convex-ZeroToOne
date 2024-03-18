import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages_email: defineTable({
    attachmentUris: v.optional(v.array(v.string())),
    body: v.optional(v.string()),
    cc: v.optional(v.string()),
    dateReceived: v.string(),
    dateSent: v.string(),
    from: v.string(),
    headers: v.optional(v.string()),
    rawMessage: v.string(),
    subject: v.string(),
    to: v.string(),
    teamId: v.string(),
  }),
  teams: defineTable({
    teamName: v.string(),
    teamOwner: v.string(),
    parentId: v.optional(v.string()),
  }),
});
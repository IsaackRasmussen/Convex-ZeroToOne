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
    usersIdentityId: v.string(),
  }),
  users: defineTable({ did: v.string() }),
  users_identity: defineTable({
    firstName: v.string(),
    identifier: v.string(),
    lastName: v.string(),
    middleName: v.string(),
    type: v.string(),
    usersId: v.string(),
  }),
});
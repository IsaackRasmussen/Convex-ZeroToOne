import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const existsIdentity = query({
  args: {
    identifier: v.string(),
    type: v.string()
  },
  handler: async (ctx, args) => {
    // Get user
    const user = await ctx.db.query("users_identity")
      .filter((q) => q.eq(q.field("identifier"), args.identifier))
      .filter((q) => q.eq(q.field("type"), args.type))
      .first();

      return user?._id;
  },
});

export const addIdentifer = mutation({
  args: {
    identifier: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    middleName: v.string(),
    did: v.string()
  },
  handler: async (ctx, args) => {
    // Get any existing user
    let user = await ctx.db.query("users")
      .filter((q) => q.eq(q.field("did"), args.did))
      .first();
    const userId = user?._id ?? await ctx.db.insert("users", { did: args.did });

    await ctx.db.insert("users_identity", {
      identifier: args.identifier,
      type: "email",
      firstName: args.firstName,
      lastName: args.lastName,
      middleName: args.middleName,
      usersId: userId
    });
  },
});

export const remove = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    // Send a new message.
    await ctx.db.delete(args.id);
  },
});

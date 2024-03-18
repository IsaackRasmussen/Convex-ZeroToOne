import { api } from "../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { DefineSchemaOptions } from "convex/server";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const teamExists = query({
  args: {
    teamName: v.string()
  },
  handler: async (ctx, args) => {
    // Get team
    const team = await ctx.db.query("teams")
      .filter((q) => q.eq(q.field("teamName"), args.teamName))
      .first();

    return team?._id;
  },
});

export const listTeams = query({
  args: {
    parentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {

    let teamsTree: any = [];
    if (args.parentId) {
      teamsTree = await ctx.db.query("teams")
        .filter((q) => q.eq(q.field("parentId"), args.parentId))
        .collect();
    } else {
      teamsTree = await ctx.db.query("teams")
        .collect();
    }

    return teamsTree;
  },
});

export const addTeam = mutation({
  args: {
    teamOwner: v.string(),
    teamName: v.string(),
    parentId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("teams", {
      teamName: args.teamName + "@kaka-dou.com",
      teamOwner: args.teamOwner,
      parentId: args.parentId
    });
  },
});

export const remove = mutation({
  args: { id: v.id("teams") },
  handler: async (ctx, args) => {
    // Send a new message.
    await ctx.db.delete(args.id);
  },
});

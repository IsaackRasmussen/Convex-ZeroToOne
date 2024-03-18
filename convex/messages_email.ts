import { query, mutation } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { parseMail } from '@protontech/jsmimeparser';

export const list = query({
  args: { user: v.string() },
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages_email").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse();
  },
});

export const emailAdd = mutation({
  args: {
    emailTo: v.string(),
    emailFrom: v.string(),
    rawMessage: v.string()
  },
  handler: async (ctx, args) => {
    // Get team
    const teamId = (await ctx.db.query("teams")
      .filter((q) => q.eq(q.field("teamName"), args.emailTo))
      .first())?._id;

    // Add a new message.
    if (teamId) {
      const {
        attachments, // [{ contentType: 'image/gif', fileName: 'smile.gif', content: Uint8Array[71, 73, 70..], ... }]
        body, 
        subject, 
        from, 
        to, 
        date, // Date('Wed, 20 Aug 2003 16:02:43 -0500')
        //        ...rest // headers and more
      } = parseMail(args.rawMessage);

      await ctx.db.insert("messages_email", {
        body: body?.html ?? body?.text ?? undefined,
        teamId,
        attachmentUris: [],
        cc: "",
        dateReceived: new Date().toISOString(),
        dateSent: date?.toISOString() ?? "",
        from: args.emailFrom,
        headers: "",
        rawMessage: args.rawMessage,
        subject: subject ?? "",
        to: args.emailTo
      });
    } else {
      throw new ConvexError({
        message: "Team doesn't exist",
        code: 404,
        severity: "high",
      });
    }
  },
});

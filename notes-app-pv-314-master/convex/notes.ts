import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
 
export const getNotes = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("notes").collect();
    }
});

export const createNote = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", {
      text: args.text,
      isComplete: false,
    });
  },
});

export const toggleNote = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    const note = await ctx.db.get(args.id);
    if (!note) {
      throw new ConvexError("Note not found");
    }
    return await ctx.db.patch(args.id, {
      isComplete: !note.isComplete,
    });
  },
});
 
export const deleteNote = mutation({
  args: {
    id: v.id("notes"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});
 
export const updateNote = mutation({
  args: {
    id: v.id("notes"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});
 
export const clearAllNotes = mutation({
  args: {},
  handler: async (ctx) => {
    const notes = await ctx.db.query("notes").collect();
    for (const note of notes) {
      await ctx.db.delete(note._id);
    }
    return { deletedCount: notes.length };
  },
});
 
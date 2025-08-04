import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getCurrentUser } from "./users";

export const getTodos = query({
  args: {},
  returns: v.array(v.object({
    _id: v.id("todos"),
    _creationTime: v.number(),
    userId: v.string(),
    text: v.string(),
    completed: v.boolean(),
  })),
  handler: async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    return await ctx.db
      .query("todos")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
  },
});

export const addTodo = mutation({
  args: {
    text: v.string(),
  },
  returns: v.id("todos"),
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    return await ctx.db.insert("todos", {
      userId: user._id,
      text: args.text,
      completed: false,
    });
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== user._id) {
      throw new Error("Todo not found or not authorized");
    }

    await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });

    return null;
  },
});

export const deleteTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== user._id) {
      throw new Error("Todo not found or not authorized");
    }

    await ctx.db.delete(args.id);
    return null;
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    const todo = await ctx.db.get(args.id);
    if (!todo || todo.userId !== user._id) {
      throw new Error("Todo not found or not authorized");
    }

    await ctx.db.patch(args.id, {
      text: args.text,
    });

    return null;
  },
});

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
// @snippet start schema
export default defineSchema({
  notes: defineTable({
    text: v.string(),
    isComplete: v.boolean(),
  }),
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string(),
  }),
  products: defineTable({
    name: v.string(),
    price: v.number(),
    description: v.string(),
    count: v.number(),
  }),
});

import mongoose, { Schema, models, model } from "mongoose";

export interface IBlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  published: boolean;
  createdAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const BlogPost =
  models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);

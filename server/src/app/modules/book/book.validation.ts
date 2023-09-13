import z from "zod";
const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publication: z.string({
      required_error: "Publication is required",
    }),
    rating: z.number().optional(),
    wishlist: z.string().optional(),
    bookmark: z.string().optional(),
    discription: z.string({
      required_error: "Discription is required",
    }),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    wishlist: z.string().optional(),
    bookmark: z.string().optional(),
    publication: z.string().optional(),
    rating: z.number().optional(),
    discription: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};

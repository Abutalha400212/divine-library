import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/books/comments/${id}`,
        method: 'PATCH',
        body: { comment },
      }),
    }),
    getBooks: builder.query({
      query: ({ search, currentPage, limit }) =>
        `/books?searchTerm=${search}&page=${currentPage}&limit=${limit}`,
      providesTags: ['books'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ['books'],
    }),
    addBook: builder.mutation({
      query: (book) => ({
        url: `/books/add-book`,
        method: 'POST',
        body: book,
      }),
      invalidatesTags: ['books'],
    }),
    updateBook: builder.mutation({
      query: ({ _id, ...book }) => ({
        url: `/books/${_id}`,
        method: 'PATCH',
        body: book,
      }),
      invalidatesTags: ['books'],
    }),
    deleteBook: builder.mutation({
      query: ({ _id }) => ({
        url: `/books/${_id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  usePostCommentMutation,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

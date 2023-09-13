'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { IBook } from '@/types/globalTypes';
import { useAddBookMutation } from '@/redux/features/books/bookApi';
import { imageUpload } from '@/api/image';
import { useAppSelector } from '@/redux/hook';
import { useNavigate } from 'react-router-dom';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function AddBookForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();
  const { user } = useAppSelector((state) => state.user);
  const [mutate] = useAddBookMutation();
  const navigate = useNavigate();
  const onSubmit = (data: IBook) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append('image', image);
    imageUpload(formData).then((Imgdata) => {
      const book = {
        author: data.author,
        genre: data.genre,
        publication: data.publication,
        rating: 4,
        title: data.title,
        discription: data.discription,
        image: Imgdata.data.display_url,
        email: user?.email,
      };
      mutate({ ...book }).then(() => {
        toast({
          description: 'Book Added',
        });
        navigate('/books');
      });
    });
  };

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="title">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Title"
              type="text"
              autoCapitalize="none"
              autoComplete="title"
              autoCorrect="off"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p>{errors.title.message}</p>}
            <Label className="sr-only" htmlFor="author">
              Author
            </Label>
            <Input
              id="author"
              placeholder="Author"
              type="text"
              autoCapitalize="none"
              autoComplete="author"
              autoCorrect="off"
              {...register('author', { required: 'Author is required' })}
            />
            {errors.author && <p>{errors.author.message}</p>}
            <Label className="sr-only" htmlFor="genre">
              Genre
            </Label>
            <Input
              id="genre"
              placeholder="Genre"
              type="text"
              autoCapitalize="none"
              autoComplete="genre"
              autoCorrect="off"
              {...register('genre', { required: 'Genre is required' })}
            />
            {errors.genre && <p>{errors.genre.message}</p>}
            <Label className="sr-only" htmlFor="publication">
              Publication
            </Label>
            <Input
              id="publication"
              placeholder="Publication"
              type="text"
              autoCapitalize="none"
              autoComplete="publication"
              autoCorrect="off"
              {...register('publication', {
                required: 'Publication is required',
              })}
            />
            {errors.publication && <p>{errors.publication.message}</p>}
            <Label className="sr-only" htmlFor="discription">
              Discription
            </Label>
            <Textarea
              id="discription"
              placeholder="Discription"
              autoCapitalize="none"
              autoComplete="discription"
              autoCorrect="off"
              {...register('discription', {
                required: 'Discription is required',
              })}
            />
            {errors.discription && <p>{errors.discription.message}</p>}
          </div>
          <div>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      type="file"
                      {...register('image', { required: 'Drug your Photo' })}
                      id="file-upload"
                      className="sr-only"
                    />
                    {errors.image && <p>{errors.image.message}</p>}
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <Button type="submit">Add Book</Button>
        </div>
      </form>
    </div>
  );
}

// const image = data.file[0];
// const formData = new FormData();
// formData.append('image', image);
// imageUpload(formData).then((Imgdata) => {
//     const user = {
//       name: data.name,
//       email: data.email,
//       account: data.accountType,
//       img: Imgdata.data.display_url,
//     };

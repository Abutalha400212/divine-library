'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { IBook } from '@/types/globalTypes';
import { useUpdateBookMutation } from '@/redux/features/books/bookApi';
import { useNavigate } from 'react-router-dom';
import { toast } from './ui/use-toast';
import { useAppSelector } from '@/redux/hook';
import { Textarea } from './ui/textarea';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UpdateBookForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBook>();
  const { book } = useAppSelector((state: { book: any }) => state.book);
  const navigate = useNavigate();
  const [mutate] = useUpdateBookMutation();
  const onSubmit = (data: IBook) => {
    const doc = {
      _id: book?._id,
      author: data.author,
      genre: data.genre,
      publication: data.publication,
      rating: 4,
      title: data.title,
      discription: data.discription,
      commnents: [],
    };
    console.log(doc);
    mutate({ ...doc }).then(() => {
      navigate(`/book-details/${book?._id}`);
      toast({
        duration: 1000,
        className: 'shadow-xl rounded-2xl bg-blue-500',
        description: 'Book Updated',
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
              defaultValue={book?.title}
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
              defaultValue={book?.author}
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
              defaultValue={book?.genre}
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
              defaultValue={book?.publication}
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
              defaultValue={book?.discription}
              {...register('discription', {
                required: 'Discription is required',
              })}
            />
            {errors.discription && <p>{errors.discription.message}</p>}
          </div>

          <Button type="submit">Update Book</Button>
        </div>
      </form>
    </div>
  );
}

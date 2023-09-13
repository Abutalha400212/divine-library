import { Link } from 'react-router-dom';
import { AddBookForm } from '@/components/AddBook';

export default function AddBook() {
  return (
    <>
      <div className="mx-auto flex  flex-col justify-center space-y-6 sm:w-[550px] px-5 ">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Published a book
          </h1>
          <p className="text-sm text-muted-foreground">Add your Book below</p>
        </div>
        <AddBookForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </>
  );
}

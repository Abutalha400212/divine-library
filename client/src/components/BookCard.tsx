import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

import { BsBookmarkFill, BsBookmark } from 'react-icons/bs';
import { useAppSelector } from '@/redux/hook';
import { useUpdateBookMutation } from '@/redux/features/books/bookApi';

interface IProps {
  book: IBook;
}

export default function BookCard({ book }: IProps) {
  const { user } = useAppSelector((state) => state.user);
  const [updateWishlist] = useUpdateBookMutation();

  const handleAddToWishlist = (book: IBook) => {
    const { wishlist, ...data } = book;
    updateWishlist({ ...data, wishlist: user?.email });
    toast({
      description: 'Save to Wishlist',
    });
  };
  const handleAddToBookmark = (book: IBook) => {
    const { bookmark, ...data } = book;
    updateWishlist({ ...data, bookmark: user?.email });
    toast({
      description: 'Save to Bookmark',
    });
  };
  return (
    <div>
      <div className="relative rounded-2xl h-[500px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/book-details/${book._id}`} className="w-full">
          <img
            className="h-[300px] rounded-lg mb-1"
            src={book?.image}
            alt="book"
          />
          <h1 className="text-xl font-semibold">{book?.title}</h1>
          <p>Written By: {book?.author}</p>
        </Link>
        <p className="text-sm">Category: {book?.genre}</p>
        <p className="text-sm">Publication: {book?.publication}</p>
        {book.wishlist === user.email ? (
          <Button disabled>Wishlisted</Button>
        ) : (
          <Button onClick={() => handleAddToWishlist(book)}>
            Add to Wishlist
          </Button>
        )}
        <Button
          variant={'ghost'}
          className="absolute right-5 rounded-full cursor-pointer"
          title="Add to Bookmark"
        >
          {book.bookmark === user.email ? (
            <BsBookmarkFill />
          ) : (
            <BsBookmark onClick={() => handleAddToBookmark(book)} size="15" />
          )}
        </Button>
      </div>
    </div>
  );
}

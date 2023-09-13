/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { IBook } from '@/types/globalTypes';
import { useAppSelector } from '@/redux/hook';
import { toast } from './ui/use-toast';
import {
  useGetBooksQuery,
  useUpdateBookMutation,
} from '@/redux/features/books/bookApi';
import { BsBookmarkFill } from 'react-icons/bs';

export default function Bookmark() {
  const { user } = useAppSelector((state) => state.user);
  console.log(user);
  const [updateWishlist] = useUpdateBookMutation();
  const { data } = useGetBooksQuery({ search: '', currentPage: '', limit: 0 });
  console.log(data);
  const filters: IBook[] = data?.data.filter(
    (el: IBook) => el.bookmark === user.email
  );

  const handleRemoveProduct = (book: IBook) => {
    const { bookmark, ...data } = book;
    updateWishlist({ ...data, bookmark: '' }).then(() => {
      toast({
        duration: 1000,
        description: 'Thanks for finishing the book',
      });
    });
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="" title="bookmark">
          <BsBookmarkFill size="15" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Bookmark</SheetTitle>
        </SheetHeader>
        <div className="space-y-5">
          {user?.email &&
            filters?.map((book) => (
              <div
                className="border h-44 p-5 flex justify-between rounded-md"
                key={book.title}
              >
                <div className="border-r pr-5 shrink-0">
                  <img src={book?.image} alt="" className="h-full" />
                </div>
                <div className="px-2 w-full flex flex-col justify-center items-center gap-3">
                  <h1 className="text-sm  font-bold">
                    {book?.title} <br />
                    <span className="font-semibold text-xs">
                      By {book?.author}
                    </span>
                  </h1>
                </div>
                <div className="border-l pl-5 flex flex-col justify-center items-center">
                  <Button
                    onClick={() => handleRemoveProduct(book)}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-400"
                  >
                    Finish
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

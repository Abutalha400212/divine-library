import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { FaHeartCircleCheck } from 'react-icons/fa6';
import { HiOutlineTrash } from 'react-icons/hi';
import { Button } from './ui/button';
import { IBook } from '@/types/globalTypes';
import { useAppSelector } from '@/redux/hook';
import { toast } from './ui/use-toast';
import {
  useGetBooksQuery,
  useUpdateBookMutation,
} from '@/redux/features/books/bookApi';

export default function Wishlist() {
  const { user } = useAppSelector((state: { user: any }) => state.user);
  const [updateWishlist] = useUpdateBookMutation();
  const { data } = useGetBooksQuery({ search: '', currentPage: '', limit: 0 });
  console.log(data);
  const filters: IBook[] = data?.data.filter(
    (el: IBook) => el.wishlist === user.email
  );

  const handleRemoveProduct = (book: IBook) => {
    const { wishlist, ...data } = book;
    updateWishlist({ ...data, wishlist: '' }).then(() => {
      toast({
        duration: 1000,
        description: 'Remove Book from Wishlist',
      });
    });
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" className="" title="wishlist">
          <FaHeartCircleCheck size="20" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
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
                    <HiOutlineTrash size="20" />
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

import BookReview from '@/components/BookReview';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { FcRating } from 'react-icons/fc';
import {
  useDeleteBookMutation,
  useSingleBookQuery,
} from '@/redux/features/books/bookApi';
import { Loader } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { IBook } from '@/types/globalTypes';
import { setBook } from '@/redux/features/books/bookSlice';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from '@/components/ui/use-toast';
export type IComments = {
  commnents: string[];
  id: string;
};
export default function ProductDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const { id } = useParams();
  const { data, isLoading } = useSingleBookQuery(id);
  const [mutate] = useDeleteBookMutation();
  const book = data?.data;
  if (isLoading) {
    return <Loader />;
  }
  const handleUpdate = (book: IBook) => {
    dispatch(setBook(book));
    navigate('/update');
  };
  const handleDelete = (book: IBook) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="rounded-2xl w-[300px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
            <h1 className="font-semibold">Are you sure?</h1>
            <p>You want to delete this product?</p>
            <div className="flex justify-center gap-4">
              <Button
                variant={'destructive'}
                onClick={() => {
                  onClose();
                  toast({
                    variant: 'destructive',
                    duration: 1000,
                    description: 'Canceled to delete',
                  });
                }}
              >
                No
              </Button>
              <Button
                onClick={() =>
                  mutate(book).then(() => {
                    onClose();
                    toast({
                      duration: 1000,
                      className: 'shadow-xl rounded-2xl bg-blue-500',
                      description: 'Successfully Delete Book',
                    });

                    navigate('/books');
                  })
                }
              >
                Yes, Delete it!
              </Button>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center  border-gray-300 p-5 mt-5">
        <div className="w-[50%]">
          <img className="w-[500px]" src={book?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.title}</h1>
          <p>{book?.discription}</p>
          <p className="text-lg">
            <span className="font-semibold">Category:</span> {book?.genre}
          </p>
          <p className="text-lg">
            {' '}
            <span className="font-semibold">Written By: </span>
            {book?.author}
          </p>
          <p className="text-lg flex items-center ">
            {' '}
            <span className="font-semibold mr-2">Rating: </span>
            {[...Array(book?.rating).keys()].map((rating, i) => (
              <FcRating size="20" key={i} rating={rating} />
            ))}
          </p>
          {user?.email === book?.email && (
            <>
              <Button onClick={() => handleUpdate(book)}>Update</Button>
              <Button
                onClick={() => handleDelete(book)}
                variant={'destructive'}
                className="ml-2"
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </div>
      <BookReview commnents={book?.commnents} id={book?._id} />
    </>
  );
}

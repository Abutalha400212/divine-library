import BookCard from '@/components/BookCard';
import Pagination from '@/components/Pagination';
import Loader from '@/components/ui/loader';
import { useGetBooksQuery } from '@/redux/features/books/bookApi';
import { IBook } from '@/types/globalTypes';
import { useState } from 'react';

export default function Books({ search }: { search: string }) {
  const [limit, setLimit] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetBooksQuery({ search, currentPage, limit });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className=" max-w-7xl mx-auto mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-20">
          {data?.data?.map((book: IBook) => (
            <BookCard book={book} />
          ))}
        </div>
      </div>
      <div className="grid place-items-center place-content-center p-4">
        {data.meta.total !== data.data.length && (
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            setLimit={setLimit}
            meta={data?.meta}
          />
        )}
      </div>
    </>
  );
}

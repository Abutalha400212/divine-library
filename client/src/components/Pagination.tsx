export default function Pagination({
  setCurrentPage,
  setLimit,
  currentPage,
  meta,
}: any) {
  const total = Math.ceil(meta?.total / 3);
  console.log(total, currentPage);
  const pageNumbers = [...Array(total).keys()];

  const handleLimit = () => {
    setLimit(0);
  };
  return (
    <div className="my-4">
      <div className="">
        <ul className="inline-flex -space-x-px text-base h-10">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={
                'flex cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }
              onClick={() => setCurrentPage(number + 1)}
            >
              {number + 1}
            </li>
          ))}
          <li
            onClick={handleLimit}
            className="flex cursor-pointer items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            All
          </li>
        </ul>
      </div>
    </div>
  );
}

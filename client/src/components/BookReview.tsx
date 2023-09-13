import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { usePostCommentMutation } from '@/redux/features/books/bookApi';
import { IComments } from '@/pages/BookDetails';

export default function BookReview({ commnents, id }: IComments) {
  const [mutate] = usePostCommentMutation();
  const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = e.currentTarget.comment.value;
    mutate({ comment, id });
  };
  return (
    <div className="max-w-7xl mx-auto mt-5">
      <form onSubmit={handleComment} className="flex gap-5 items-center">
        <Textarea name="comment" className="min-h-[30px]" />
        <Button className="rounded-full h-10 w-10 p-2 text-[25px]">
          <FiSend />
        </Button>
      </form>
      <div className="mt-10">
        {commnents?.map((comment, index) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HiLogin, HiLogout } from 'react-icons/hi';
import Wishlist from '../components/Wishlist';
import logo from '../assets/images/logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { removeUser } from '@/redux/features/user/userSlice';
import Loader from '@/components/ui/loader';
import { toast } from '@/components/ui/use-toast';
import Bookmark from '@/components/Bookmark';

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(removeUser());
    localStorage.removeItem('token');
    toast({
      description: 'Successfully Logout',
    });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10 overflow-hidden">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between  w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link to="/">
              <img className="h-28" src={logo} alt="log" />
            </Link>
          </div>
          <div className="">
            <ul className="flex items-center ">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/add-book">Add Book</Link>
                </Button>
              </li>
              <li>
                <Wishlist />
              </li>
              <li>
                <Bookmark />
              </li>
              <li className=" ">
                {!user?.email && (
                  <Button className="w-12 h-8" variant="login" title="Login">
                    <Link to={'login'}>
                      <HiLogin size="22" />
                    </Link>
                  </Button>
                )}
                {user?.email && (
                  <Button
                    className="w-12 h-8"
                    title="Logout"
                    onClick={handleLogout}
                    variant="logout"
                  >
                    <HiLogout size="25" />
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

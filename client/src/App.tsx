import { useEffect } from 'react';
import { Toaster } from './components/ui/Toaster';
import MainLayout from './layouts/MainLayout';
import { useAppDispatch } from './redux/hook';
import { getUser } from './redux/features/user/userSlice';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getUser());
    }
  });
  return (
    <div>
      <Toaster />
      <MainLayout />
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/Home/BooksTable';
import BooksCard from '../components/Home/BooksCard'
// import { enqueueSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { logout, reset } from '../features/auth/authSlice';
// import { useSelector } from 'react-redux';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    axios
      .get('https://mern-bookstore-backend-51bz.onrender.com/api/v1/books', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setBooks(response.data.books);
        // console.log(response.data);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);

        // 3. Handle Token Expiration (The 10s timeout)
        if (error.response && error.response.status === 401) {
          enqueueSnackbar('Session expired. Please log in again.', { variant: 'error' });
          dispatch(logout());
          dispatch(reset());
          navigate('/login');
        }
      });
  }, [user, navigate, dispatch]);
  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 mx-auto'>Books</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
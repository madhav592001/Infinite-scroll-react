import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import InfiniteScroll from 'react-infinite-scroll-component';
import './styles/Home.css';

const Home = () => {
  let navigate = useNavigate();

  //? to set the data we receive form API
  const [users, setUsers] = React.useState([]);

  //? Function to get the data from API
  const getDetails = async () => {
    try {
      const { data } = await axios.get(`https://randomuser.me/api/?results=25`);
      console.log(data.results);
      setTimeout(() => {
        setUsers([...users, ...data.results]);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  //? LOGOUT function
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/');
  };

  React.useEffect(() => {
    getDetails();
  }, []);

  //? If a user is not logged in, It will navigate to login screen
  if (!localStorage.user) {
    return (
      <>
        <p>You are not logged in</p>
        <button onClick={() => navigate('/')}>Login</button>
      </>
    );
  }

  return (
    <div className='home-screen'>
      <div className='logout-btn-container'>
        <button onClick={logout}>Logout</button>
      </div>
      <InfiniteScroll
        dataLength={users.length}
        next={getDetails}
        loader={<h4>Loading...</h4>}
        hasMore={true}
      >
        {users.map((u, idx) => (
          <div className='user' key={idx}>
            <img src={u.picture.thumbnail} alt='profile' />
            <p>Name:{u.name.first}</p>
            <p>Contact:{u.cell}</p>
            <p>
              Location:{(u.location.city, u.location.state, u.location.country)}
            </p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Home;

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Flex } from '@chakra-ui/react';
import Loading from './components/Loading';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navigation from './components/Navigation';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';
import AddThreadPage from './pages/AddThreadPages';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LandingPage from './pages/LandingPage';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return <Loading />;
  }

  if (!authUser) {
    return (
      <>
        <Loading />
        <Flex justify="center">
          <Box width="800px">
            <Routes>
              <Route path="/*" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Box>
        </Flex>
      </>
    );
  }

  return (
    <>
      <Loading />
      <Flex justify="center">
        <Box width="800px">
          <Navigation authUser={authUser} signOut={onSignOut} />
          <Box as="main" flex="1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/thread/:threadId" element={<DetailPage />} />
              <Route path="/add-thread" element={<AddThreadPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
            </Routes>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default App;

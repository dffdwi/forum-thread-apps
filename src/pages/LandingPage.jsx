import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Heading,
  Flex,
  HStack,
  Link,
} from '@chakra-ui/react';
import LandingList from '../components/LandingList';
import asyncPopulateUsersAndThreads from '../states/shared/action';

function LandingPage() {
  const { threads = [], users = [] } = useSelector((state) => state);
  const dispatch = useDispatch();
  const categories = new Set(threads.map((thread) => thread.category));
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadList = threads.map((thread) => ({
    ...thread,
    threadOwner: users.find((user) => user.id === thread.ownerId),
  }));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box as="section" p={4}>
      <Flex as="nav" justify="space-between" align="center" mb={4}>
        <Heading as="h1" size="lg">
          Forum Thread Apps
        </Heading>
        <HStack spacing={4}>
          <Link as={RouterLink} to="/login">
            <Button colorScheme="teal">Login</Button>
          </Link>
          <Link as={RouterLink} to="/register">
            <Button colorScheme="teal">Register</Button>
          </Link>
        </HStack>
      </Flex>
      <HStack spacing={4} mb={4} wrap="wrap">
        {Array.from(categories).map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryChange(category)}
            variant={selectedCategory === category ? 'solid' : 'outline'}
            colorScheme="teal"
          >
            {category}
          </Button>
        ))}
        {selectedCategory && (
          <Button
            onClick={() => setSelectedCategory('')}
            variant="outline"
            colorScheme="red"
          >
            Show All
          </Button>
        )}
      </HStack>
      <LandingList
        threads={
          selectedCategory === ''
            ? threadList
            : threadList.filter(
              (thread) => thread.category === selectedCategory,
            )
        }
      />
    </Box>
  );
}

export default LandingPage;

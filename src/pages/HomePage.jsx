import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  IconButton,
  VStack,
  HStack,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ThreadsList from '../components/ThreadsList';
import {
  asyncDownvoteThread,
  asyncUpvoteThread,
  asyncNeutralizeThreadVote,
} from '../states/threads/action';
import asyncPopulateUsersAndThreads from '../states/shared/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((state) => state);
  const categories = new Set(threads.map((thread) => thread.category));
  const [selectedCategory, setSelectedCategory] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    dispatch(asyncUpvoteThread(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownvoteThread(id));
  };

  const onNeutralizeVoteThread = (id) => {
    dispatch(asyncNeutralizeThreadVote(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    threadOwner: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box p={4}>
      <VStack spacing={4} align="stretch">
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
        <IconButton
          as={Link}
          to="/add-thread"
          icon={<AddIcon />}
          aria-label="Add Thread"
          colorScheme="teal"
          size="lg"
          position="fixed"
          bottom={4}
          right={4}
          borderRadius="full"
        />
        <ThreadsList
          threads={
            selectedCategory === ''
              ? threadList
              : threadList.filter(
                (thread) => thread.category === selectedCategory,
              )
          }
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralizeVote={onNeutralizeVoteThread}
        />
      </VStack>
    </Box>
  );
}

export default HomePage;

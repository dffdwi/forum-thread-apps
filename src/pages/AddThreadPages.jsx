import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Heading, Container } from '@chakra-ui/react';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddThread = ({ title, body, category }) => {
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <Container maxW="container.md" mt={8}>
      <Box padding={4} boxShadow="md" borderRadius="md" bg="white">
        <Heading as="h2" size="lg" mb={4}>
          Add New Thread
        </Heading>
        <ThreadInput addThread={handleAddThread} />
      </Box>
    </Container>
  );
}

export default AddThreadPage;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Input, Textarea, Button, VStack, Box,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <Box padding={4} boxShadow="md" borderRadius="md" bg="white">
      <VStack spacing={4}>
        <Input
          placeholder="Title"
          value={title}
          onChange={onTitleChange}
          size="md"
          focusBorderColor="teal.400"
        />
        <Input
          placeholder="Category"
          value={category}
          onChange={onCategoryChange}
          size="md"
          focusBorderColor="teal.400"
        />
        <Textarea
          placeholder="Body"
          value={body}
          onChange={onBodyChange}
          size="md"
          focusBorderColor="teal.400"
        />
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => addThread({ title, body, category })}
        >
          Post
        </Button>
      </VStack>
    </Box>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;

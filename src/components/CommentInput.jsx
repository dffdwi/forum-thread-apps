import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, FormControl, FormLabel, Input, Button,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [comment, onCommentChange, setComment] = useInput('');
  const onCommentSubmit = (e) => {
    e.preventDefault();
    addComment(comment);
    setComment('');
  };

  return (
    <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md">
      <FormControl as="form" onSubmit={onCommentSubmit}>
        <FormLabel mb={2}>Beri Komentar</FormLabel>
        <Input
          value={comment}
          onChange={onCommentChange}
          placeholder="Tulis komentar Anda..."
          mb={3}
        />
        <Button type="submit" colorScheme="blue">
          Kirim
        </Button>
      </FormControl>
    </Box>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;

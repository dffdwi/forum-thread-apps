import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import {
  Box, Text, Flex, Heading, Badge,
} from '@chakra-ui/react';
import postedAt from '../utils';
import VoteButton from './VoteButton';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  threadOwner,
  authUser,
  upVote,
  downVote,
  neutralizeVote,
}) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedBody = truncateText(body, 200);

  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  return (
    <Box
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      p="4"
      mb="4"
      boxShadow="md"
      bg="white"
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
    >
      <Box onClick={onThreadClick}>
        <Flex justify="space-between" align="center" mb="2">
          <Heading size="md">{title}</Heading>
          <Badge colorScheme="blue">{category}</Badge>
        </Flex>
      </Box>
      <Box onClick={onThreadClick} mb="2">
        <Box onClick={onThreadClick} mb="2">
          <Box>{parse(truncatedBody)}</Box>
        </Box>
      </Box>
      <Flex
        justify="space-between"
        align="center"
        borderTop="1px solid"
        borderColor="gray.200"
        pt="2"
      >
        <Box onClick={onThreadClick}>
          <Text fontSize="sm">
            Dibuat Oleh:
            {' '}
            <strong>{threadOwner.name}</strong>
          </Text>
          <Text fontSize="sm">{postedAt(createdAt)}</Text>
          <Text fontSize="sm">
            {totalComments}
            {' '}
            Comments
          </Text>
        </Box>
        <Box>
          <VoteButton
            id={id}
            authUser={authUser}
            upVote={upVote}
            downVote={downVote}
            neutralizeVote={neutralizeVote}
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
          />
        </Box>
      </Flex>
    </Box>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  threadOwner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadItem;

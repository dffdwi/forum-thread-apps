import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Avatar,
  Text,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import VoteButton from './VoteButton';
import postedAt from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
  neutralizeVote,
  authUser,
}) {
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'gray.200');

  return (
    <Box bg={cardBg} p={4} borderRadius="md" boxShadow="md" mb={4} position="relative">
      <Flex justify="space-between" align="center" mb={2}>
        <Flex align="center">
          <Avatar src={owner.avatar} size="sm" mr={2} />
          <Text fontWeight="bold" color={textColor}>{owner.name}</Text>
        </Flex>
        <Text fontSize="sm" color={textColor}>{postedAt(createdAt)}</Text>
      </Flex>
      <Text mb={4} color={textColor}>{content}</Text>
      <Box position="absolute" bottom="4" right="4">
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
      <Divider mt={4} />
    </Box>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default CommentItem;

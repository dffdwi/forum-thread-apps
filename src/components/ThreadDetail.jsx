import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  Box,
  Flex,
  Heading,
  Avatar,
  Tag,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import VoteButton from './VoteButton';
import postedAt from '../utils';

function ThreadDetail({
  id,
  title,
  body,
  owner,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  upVoteThreadDetail,
  downVoteThreadDetail,
  neutralizeVoteThreadDetail,
  authUser,
}) {
  const cardBg = useColorModeValue('white', 'gray.700');
  const cardShadow = useColorModeValue('md', 'dark-lg');

  return (
    <Box bg={cardBg} p={5} boxShadow={cardShadow} borderRadius="md" mb={4}>
      <VStack spacing={4} align="start">
        <Flex justify="space-between" align="center" w="100%">
          <Heading size="md">{title}</Heading>
          <Tag colorScheme="blue">{category}</Tag>
        </Flex>
        <Box>
          <Text>{parse(body)}</Text>
        </Box>
        <Flex justify="space-between" align="center" w="100%">
          <Flex align="center">
            <Text mr={2}>Dibuat Oleh</Text>
            <Avatar src={owner.avatar} size="xs" mr={2} />
            <Text>{owner.name}</Text>
          </Flex>
          <Flex align="center">
            <Text mr={4}>{postedAt(createdAt)}</Text>
            <VoteButton
              id={id}
              authUser={authUser}
              upVote={upVoteThreadDetail}
              downVote={downVoteThreadDetail}
              neutralizeVote={neutralizeVoteThreadDetail}
              upVotesBy={upVotesBy}
              downVotesBy={downVotesBy}
            />
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVoteThreadDetail: PropTypes.func.isRequired,
  downVoteThreadDetail: PropTypes.func.isRequired,
  neutralizeVoteThreadDetail: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default ThreadDetail;

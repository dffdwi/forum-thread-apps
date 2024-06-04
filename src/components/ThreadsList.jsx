import React from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';
import ThreadItem from './ThreadItem';

function ThreadsList({
  threads, upVote, downVote, neutralizeVote,
}) {
  return (
    <VStack spacing={4} align="stretch">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          upVote={upVote}
          downVote={downVote}
          neutralizeVote={neutralizeVote}
        />
      ))}
    </VStack>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
      threadOwner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
};

export default ThreadsList;

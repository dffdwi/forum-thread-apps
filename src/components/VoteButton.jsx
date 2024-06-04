import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { Box, IconButton, Text } from '@chakra-ui/react';

function VoteButton({
  id,
  upVote,
  downVote,
  neutralizeVote,
  upVotesBy,
  downVotesBy,
  authUser,
}) {
  const isUpVoted = upVotesBy.includes(authUser);
  const isDownVoted = downVotesBy.includes(authUser);

  const onUpVoteClick = () => {
    upVote(id);
  };

  const onDownVoteClick = () => {
    downVote(id);
  };

  const onNeutralizeVoteClick = () => {
    neutralizeVote(id);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box display="flex" alignItems="center" mr="4">
        <IconButton
          icon={<FaThumbsUp />}
          aria-label="Upvote"
          onClick={isUpVoted ? onNeutralizeVoteClick : onUpVoteClick}
          colorScheme={isUpVoted ? 'blue' : 'gray'}
          variant={isUpVoted ? 'solid' : 'outline'}
          size="sm"
        />
        <Text ml="2">{upVotesBy.length}</Text>
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton
          icon={<FaThumbsDown />}
          aria-label="Downvote"
          onClick={isDownVoted ? onNeutralizeVoteClick : onDownVoteClick}
          colorScheme={isDownVoted ? 'red' : 'gray'}
          variant={isDownVoted ? 'solid' : 'outline'}
          size="sm"
        />
        <Text ml="2">{downVotesBy.length}</Text>
      </Box>
    </Box>
  );
}

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralizeVote: PropTypes.func.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default VoteButton;

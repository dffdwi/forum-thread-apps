import React from 'react';
import PropTypes from 'prop-types';
import {
  Image, Text, Flex,
} from '@chakra-ui/react';

function LeaderboardItem({ user, score }) {
  return (
    <Flex
      align="center"
      justify="space-between"
      p={2}
      boxShadow="md"
      borderRadius="md"
      bg="white"
      _hover={{ bg: 'teal.50' }}
      mb={2}
    >
      <Flex align="center">
        <Image
          alt="Avatar Icon"
          src={user.avatar}
          boxSize="50px"
          borderRadius="full"
          mr={4}
        />
        <Text fontSize="lg" fontWeight="bold" color="teal.800">
          {user.name}
        </Text>
      </Flex>
      <Text fontSize="lg" fontWeight="bold" color="teal.800">
        {score}
      </Text>
    </Flex>
  );
}

LeaderboardItem.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;

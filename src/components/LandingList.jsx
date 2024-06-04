import React from 'react';
import PropTypes from 'prop-types';
import { VStack } from '@chakra-ui/react';
import LandingThread from './LandingThread';

function LandingList({ threads }) {
  return (
    <VStack spacing={4} align="stretch">
      {threads.map((thread) => (
        <LandingThread key={thread.id} {...thread} />
      ))}
    </VStack>
  );
}

LandingList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};

export default LandingList;

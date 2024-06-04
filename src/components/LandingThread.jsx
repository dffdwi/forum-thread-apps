import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Heading, Text, Flex, Tag, Divider,
} from '@chakra-ui/react';
import parse from 'html-react-parser';
import postedAt from '../utils';

function LandingThread({
  title,
  body,
  category,
  createdAt,
  totalComments,
  threadOwner,
}) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  const truncatedBody = truncateText(body, 200);

  return (
    <Box p={4} boxShadow="md" borderRadius="md" bg="white" mb={4}>
      <Flex justify="space-between" align="center" mb={2}>
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Tag colorScheme="teal">{category}</Tag>
      </Flex>
      <Box mb={4}>
        <Text>{parse(truncatedBody)}</Text>
      </Box>
      <Divider />
      <Flex justify="space-between" align="center" mt={4}>
        <Box>
          <Text fontSize="sm">
            Dibuat Oleh:
            {threadOwner.name}
          </Text>
          <Text fontSize="sm">{postedAt(createdAt)}</Text>
          <Text fontSize="sm">
            {totalComments}
            {' '}
            Comments
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

LandingThread.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  threadOwner: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default LandingThread;

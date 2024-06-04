import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, Flex, Image, HStack, Link,
} from '@chakra-ui/react';
import { FaHome, FaListOl } from 'react-icons/fa';

function Navigation({ authUser, signOut }) {
  const { email, name, avatar } = authUser;

  return (
    <Flex
      align="center"
      justify="space-between"
      className="navigation"
      bg="white"
      p={4}
      boxShadow="md"
    >
      <Box>
        <Image src={avatar} alt={email} title={name} boxSize="45px" borderRadius="10" />
      </Box>
      <HStack spacing={4}>
        <Link as={RouterLink} to="/">
          <Button colorScheme="teal"><FaHome /></Button>
        </Link>
        <Link as={RouterLink} to="/leaderboards">
          <Button colorScheme="teal"><FaListOl /></Button>
        </Link>
      </HStack>
      <Button variant="outline" colorScheme="teal" onClick={signOut}>
        Sign out
      </Button>
    </Flex>
  );
}

const authUserShape = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;

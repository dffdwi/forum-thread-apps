import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Input, Button, VStack,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Box as="form" width="100%" maxW="sm" mx="auto" mt={4}>
      <VStack spacing={4}>
        <Input
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="Email"
          isRequired
        />
        <Input
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
          isRequired
        />
        <Button type="button" colorScheme="teal" onClick={() => login({ email, password })}>
          Login
        </Button>
      </VStack>
    </Box>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;

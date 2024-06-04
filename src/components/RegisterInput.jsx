import React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Input, Button, VStack,
} from '@chakra-ui/react';
import useInput from '../hooks/useInput';

function RegisterInput({ handleRegister }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <Box as="form" width="100%" maxW="sm" mx="auto" mt={4}>
      <VStack spacing={4}>
        <Input
          type="text"
          value={name}
          onChange={onNameChange}
          placeholder="Name"
          isRequired
        />
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
        <Button
          type="button"
          colorScheme="teal"
          onClick={() => handleRegister({ name, email, password })}
        >
          Register
        </Button>
      </VStack>
    </Box>
  );
}

RegisterInput.propTypes = {
  handleRegister: PropTypes.func.isRequired,
};

export default RegisterInput;

import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box, Heading, Text, VStack, Button,
} from '@chakra-ui/react';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ email, name, password }));
    navigate('/login');
  };

  return (
    <Box className="register" display="flex" justifyContent="center" alignItems="center" height="100vh" bg="gray.50">
      <Box className="register-page" p={6} maxW="md" borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg">
        <VStack spacing={4} align="stretch">
          <Heading as="h1" size="lg" textAlign="center">Register</Heading>
          <RegisterInput handleRegister={onRegister} />
          <Text textAlign="center">
            Already have an account?
            {' '}
            <RouterLink to="/login">
              <Text as="span" color="teal.500">Login</Text>
            </RouterLink>
          </Text>
          <RouterLink to="/">
            <Button variant="link" colorScheme="teal">Back to Home</Button>
          </RouterLink>
        </VStack>
      </Box>
    </Box>
  );
}

export default RegisterPage;

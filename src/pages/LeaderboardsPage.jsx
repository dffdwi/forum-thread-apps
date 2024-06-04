import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box, Text, Grid, GridItem, Heading, Divider,
} from '@chakra-ui/react';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncFetchLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncFetchLeaderboards());
  }, [dispatch]);

  return (
    <Box p={4} maxW="800px" mx="auto" bg="gray.50" borderRadius="md" boxShadow="lg">
      <Box p={6} boxShadow="lg" borderRadius="md" bg="grey.50">
        <Heading as="h1" size="lg" mb={4} textAlign="center" color="teal.700">
          Leaderboards
        </Heading>
        <Divider mb={4} />
        <Grid templateColumns="2fr 1fr" gap={4} mb={4} alignItems="center">
          <GridItem>
            <Text fontWeight="bold" fontSize="lg" color="teal.700">
              10 Pengguna Teratas
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="bold" fontSize="lg" color="teal.700" textAlign="end">
              Skor
            </Text>
          </GridItem>
        </Grid>
        <Divider mb={4} />
        {leaderboards.map(({ user, score }) => (
          <LeaderboardItem key={user.id} user={user} score={score} />
        ))}
      </Box>
    </Box>
  );
}

export default LeaderboardsPage;

/* eslint-disable max-len */
/**
 * Skenario pengujian untuk leaderboards/action.js:
 *
 * - should dispatch showLoading action and receiveLeaderboardsActionCreator action correctly when data fetching is successful
 * - should dispatch showLoading action and hideLoading action and show an alert with error message when data fetching fails
 */

import {
  describe, it, expect, beforeEach, afterEach, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  receiveLeaderboardsActionCreator,
  asyncFetchLeaderboards,
} from './action';

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncFetchLeaderboards thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._getLeaderBoards = api.getLeaderBoards;
  });

  afterEach(() => {
    // restore original implementation
    api.getLeaderBoards = api._getLeaderBoards;
  });

  // delete backup
  delete api._getLeaderBoards;

  it('should dispatch actions correctly when data fetching is successful', async () => {
    // arrange
    api.getLeaderBoards = () => Promise.resolve(fakeLeaderboardsResponse);
    const dispatch = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should handle errors correctly when data fetching fails', async () => {
    // arrange
    api.getLeaderBoards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();

    window.alert = vi.fn();

    // action
    await asyncFetchLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

/* eslint-disable max-len */
/**
 * Skenario pengujian untuk threadsReducer:
 *
 * - should return the initial state when given an unknown action
 * - should return the threads when given the RECEIVE_THREADS action
 * - should return the threads with the new thread when given the ADD_THREAD action
 * - should return the threads with the upvoted thread when given the UP_VOTE_THREAD action
 * - should return the threads with the downvoted thread when given the DOWN_VOTE_THREAD action
 * - should return the threads with the neutralized thread vote when given the NEUTRALIZE_THREAD_VOTE action
 */
import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given the RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given the ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('should return the threads with the upvoted thread when given the UP_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with the downvoted thread when given the DOWN_VOTE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it('should return the threads with the neutralized thread vote when given the NEUTRALIZE_THREAD_VOTE action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: 'NEUTRALIZE_THREAD_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
      },
    };
    // action: neutralize vote
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [],
      },
    ]);
  });
});

/* eslint-disable max-len */
/**
 * Skenario pengujian untuk threadDetailReducer:
 *
 * - should return the initial state when given an unknown action
 * - should return the thread detail when given the RECEIVE_THREAD_DETAIL action
 * - should return the thread detail with the upvoted thread when given the UP_VOTE_THREAD_DETAIL action
 * - should return the thread detail with the downvoted thread when given the DOWN_VOTE_THREAD_DETAIL action
 * - should return the thread detail with the neutralized thread vote when given the NEUTRALIZE_VOTE_THREAD_DETAIL action
 * - should return the thread detail with the new comment when given the CREATE_COMMENT action
 * - should return the thread detail with the upvoted comment when given the UP_VOTE_COMMENT action
 * - should return the thread detail with the downvoted comment when given the DOWN_VOTE_COMMENT action
 * - should return the thread detail with the neutralized comment vote when given the NEUTRALIZE_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

const initialState = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

describe('threadDetailReducer function', () => {
  it('should return the initial state when given an unknown action', () => {
    // Arrange
    const unknownAction = { type: 'UNKNOWN' };

    // Action
    const nextState = threadDetailReducer(initialState, unknownAction);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail when given the RECEIVE_THREAD_DETAIL action', () => {
    // Arrange
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: { ...initialState },
      },
    };

    // Action
    const nextState = threadDetailReducer(null, action);

    // Assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return the thread detail with the upvoted thread when given the UP_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: { userId: 'users-1' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });
  });

  it('should return the thread detail with the downvoted thread when given the DOWN_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: { userId: 'users-1' },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });
  });

  it('should return the thread detail with the neutralized thread vote when given the NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    // Arrange
    const stateWithUpvote = {
      ...initialState,
      upVotesBy: ['users-1'],
    };
    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
      payload: { userId: 'users-1' },
    };

    // Action
    const nextState = threadDetailReducer(stateWithUpvote, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the thread detail with the new comment when given the CREATE_COMMENT action', () => {
    // Arrange
    const newComment = {
      id: 'comment-1',
      content: 'Ini adalah komentar pertama',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'CREATE_COMMENT',
      payload: { comment: newComment },
    };

    // Action
    const nextState = threadDetailReducer(initialState, action);

    // Assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [newComment, ...initialState.comments],
    });
  });

  it('should return the thread detail with the upvoted comment when given the UP_VOTE_COMMENT action', () => {
    // Arrange
    const stateWithComment = {
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    // Action
    const nextState = threadDetailReducer(stateWithComment, action);

    // Assert
    expect(nextState).toEqual({
      ...stateWithComment,
      comments: [
        {
          ...stateWithComment.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it('should return the thread detail with the downvoted comment when given the DOWN_VOTE_COMMENT action', () => {
    // Arrange
    const stateWithComment = {
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    // Action
    const nextState = threadDetailReducer(stateWithComment, action);

    // Assert
    expect(nextState).toEqual({
      ...stateWithComment,
      comments: [
        {
          ...stateWithComment.comments[0],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it('should return the thread detail with the neutralized comment vote when given the NEUTRALIZE_VOTE_COMMENT action', () => {
    // Arrange
    const stateWithUpvotedComment = {
      ...initialState,
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'NEUTRALIZE_VOTE_COMMENT',
      payload: { commentId: 'comment-1', userId: 'users-1' },
    };

    // Action
    const nextState = threadDetailReducer(stateWithUpvotedComment, action);

    // Assert
    const expectedState = {
      ...initialState,
      comments: [
        {
          ...stateWithUpvotedComment.comments[0],
          upVotesBy: [],
        },
      ],
    };
    expect(nextState).toEqual(expectedState);
  });
});

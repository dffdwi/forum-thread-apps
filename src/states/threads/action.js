import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_THREAD_VOTE: 'NEUTRALIZE_THREAD_VOTE',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      console.log(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      console.log(error.message);
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      console.log(error.message);
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadVote(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      console.log(error.message);
      dispatch(
        neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id }),
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncUpvoteThread,
  asyncDownvoteThread,
  asyncNeutralizeThreadVote,
};

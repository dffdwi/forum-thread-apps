import { ActionType } from './action';

function updateVotes(thread, userId, voteType) {
  const { upVotesBy, downVotesBy } = thread;
  const isUpVoted = upVotesBy.includes(userId);
  const isDownVoted = downVotesBy.includes(userId);

  if (isUpVoted || isDownVoted) {
    if (voteType === 'up') {
      return {
        ...thread,
        upVotesBy: isUpVoted
          ? upVotesBy.filter((id) => id !== userId)
          : [...upVotesBy, userId],
        downVotesBy: isDownVoted
          ? downVotesBy.filter((id) => id !== userId)
          : downVotesBy,
      };
    }

    if (voteType === 'down') {
      return {
        ...thread,
        upVotesBy: isUpVoted
          ? upVotesBy.filter((id) => id !== userId)
          : upVotesBy,
        downVotesBy: isDownVoted
          ? downVotesBy.filter((id) => id !== userId)
          : [...downVotesBy, userId],
      };
    }
  } else {
    if (voteType === 'up') {
      return {
        ...thread,
        upVotesBy: [...upVotesBy, userId],
      };
    }

    if (voteType === 'down') {
      return {
        ...thread,
        downVotesBy: [...downVotesBy, userId],
      };
    }
  }

  return thread;
}

export default function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;

    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];

    case ActionType.UP_VOTE_THREAD:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? updateVotes(thread, action.payload.userId, 'up')
        : thread));

    case ActionType.DOWN_VOTE_THREAD:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? updateVotes(thread, action.payload.userId, 'down')
        : thread));

    case ActionType.NEUTRALIZE_THREAD_VOTE:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? {
          ...thread,
          upVotesBy: thread.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
          downVotesBy: thread.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        }
        : thread));

    default:
      return threads;
  }
}

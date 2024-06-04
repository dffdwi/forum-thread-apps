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

export default function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;

    case ActionType.UP_VOTE_THREAD_DETAIL:
      return updateVotes(threadDetail, action.payload.userId, 'up');

    case ActionType.DOWN_VOTE_THREAD_DETAIL:
      return updateVotes(threadDetail, action.payload.userId, 'down');

    case ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: threadDetail.upVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
        downVotesBy: threadDetail.downVotesBy.filter(
          (id) => id !== action.payload.userId,
        ),
      };

    case ActionType.CREATE_COMMENT:
      return {
        ...threadDetail,
        comments: [action.payload.comment, ...threadDetail.comments],
      };

    case ActionType.UP_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? updateVotes(comment, action.payload.userId, 'up')
          : comment)),
      };

    case ActionType.DOWN_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? updateVotes(comment, action.payload.userId, 'down')
          : comment)),
      };

    case ActionType.NEUTRALIZE_VOTE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: comment.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
            downVotesBy: comment.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          }
          : comment)),
      };

    default:
      return threadDetail;
  }
}

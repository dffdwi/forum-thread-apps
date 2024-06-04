import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  VStack,
} from '@chakra-ui/react';
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncCreateComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentsList';

function DetailPage() {
  const { threadId } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));
  }, [threadId, dispatch]);

  const onUpVoteThreadDetail = () => {
    dispatch(asyncUpVoteThreadDetail());
  };

  const onDownVoteThreadDetail = () => {
    dispatch(asyncDownVoteThreadDetail());
  };

  const onNeutralizeVoteThreadDetail = () => {
    dispatch(asyncNeutralizeVoteThreadDetail());
  };

  const onCommentSubmit = (content) => {
    dispatch(asyncCreateComment({ content }));
  };

  const onUpVoteComment = (id) => {
    dispatch(asyncUpVoteComment(id));
  };

  const onDownVoteComment = (id) => {
    dispatch(asyncDownVoteComment(id));
  };

  const onNeutralizeVoteComment = (id) => {
    dispatch(asyncNeutralizeVoteComment(id));
  };

  return (
    <Box paddingBottom={16}>
      {threadDetail && (
        <VStack spacing={2} align="stretch">
          <ThreadDetail
            {...threadDetail}
            authUser={authUser.id}
            upVoteThreadDetail={onUpVoteThreadDetail}
            downVoteThreadDetail={onDownVoteThreadDetail}
            neutralizeVoteThreadDetail={onNeutralizeVoteThreadDetail}
          />
          <CommentInput addComment={onCommentSubmit} />
          <Heading size="md" marginLeft={2} marginBlock={4}>
            Komentar (
            {threadDetail.comments.length}
            )
          </Heading>
          <CommentsList
            comments={threadDetail.comments}
            authUser={authUser.id}
            upVoteComment={onUpVoteComment}
            downVoteComment={onDownVoteComment}
            neutralizeVoteComment={onNeutralizeVoteComment}
          />
        </VStack>
      )}
    </Box>
  );
}

export default DetailPage;

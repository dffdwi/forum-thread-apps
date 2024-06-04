const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const api = (() => {
  async function _fetchWithAuth(url, options = {}) {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token available');
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  }

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }
  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { token },
    } = responseJson;

    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { user },
    } = responseJson;

    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { users },
    } = responseJson;

    return users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { threads },
    } = responseJson;

    return threads;
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, category }),
    });

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { thread },
    } = responseJson;

    return thread;
  }

  async function upVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function downVoteThread(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function neutralizeThreadVote(threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST',
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }
  }

  async function getThreadDetail(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { detailThread },
    } = responseJson;

    return detailThread;
  }

  async function upVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;
    return vote;
  }
  async function downVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;
    return vote;
  }
  async function neutralVoteComment(threadId, commentId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { vote },
    } = responseJson;
    return vote;
  }

  async function getLeaderBoards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    const {
      data: { leaderboards },
    } = responseJson;
    return leaderboards;
  }

  async function createComment({ content, threadId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      },
    );

    const responseJson = await response.json();

    const { status, message } = responseJson;

    if (status !== 'success') {
      throw new Error(message);
    }

    const {
      data: { comment },
    } = responseJson;

    return comment;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    createThread,
    upVoteThread,
    downVoteThread,
    neutralizeThreadVote,
    getThreadDetail,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getLeaderBoards,
    createComment,
  };
})();

export default api;

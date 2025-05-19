import axios from 'axios';
import { apiClient } from '../service/api-config';

export const signup = (userDTO) => apiClient.post("/api/auth/signup", userDTO);

export const signin = ({ username, password }) => {
  /* return 키워드가 빠지면 호출 쪽에서 .then()을 못 씀 */
  return apiClient
    .post("/api/auth/login", { username, password })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("ACCESS_TOKEN", token);
      apiClient.defaults.headers.Authorization = `Bearer ${token}`;
      return res.data;          // ← 로그인 컴포넌트에서 response.token 접근 가능
    });
};

export const logout = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  delete apiClient.defaults.headers.Authorization;
};

const api = {
    getPosts: () => apiClient.get('/api/board'),
    createPost: (data) => apiClient.post("/api/board", data),
    deletePost: (id) => apiClient.delete(`/api/board/${id}`),
    updatePost: (post) => apiClient.put("/api/board", post),
    deletePostsBulk: (ids) => apiClient.delete('/api/board', { data: { ids } }),
    getPostById: (id) => apiClient.get(`/api/board/id/${id}`),
    getPostByTitle: (title) => apiClient.get(`/api/board/title/${title}`),
    getPostByAuthor: (author) => apiClient.get(`/api/board/author/${author}`),
};
export default api;

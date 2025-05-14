import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Post {
  id: string;
  content: string;
  synced: boolean;
  timestamp?: string;
  userId?: number;
  username?: string;
  updated?: boolean;
  deleted?: boolean;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },

    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    markPostsynced: (state, action: PayloadAction<string>) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) {
        post.synced = true;
      }
    },
    editPost: (state, action: PayloadAction<{id: string; content: string}>) => {
      state.posts = state.posts.map(post =>
        post.id === action.payload.id
          ? {...post, content: action.payload.content, synced: false}
          : post,
      );
    },
    deletePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.map(p =>
        p.id === action.payload ? {...p, deleted: true, synced: false} : p,
      );
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(p => p.id !== action.payload);
    },
  },
});

export const {
  addPost,
  setPosts,
  markPostsynced,
  editPost,
  deletePost,
  removePost,
} = postsSlice.actions;

export default postsSlice.reducer;

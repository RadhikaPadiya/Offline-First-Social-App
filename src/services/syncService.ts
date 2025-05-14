import axios from 'axios';
import {markPostAsSynced, getDBconnection, hardDeletePost} from './dbService';
import {AppDispatch} from '../redux/store';
import {markPostsynced, removePost} from '../redux/postsSlice';

export const syncPosts = async (unsyncedPosts: any[], dispatch: AppDispatch) => {
  const db = await getDBconnection();
  for (const post of unsyncedPosts) {
    try {
      if (post.deleted) {
        
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`);
        await hardDeletePost(db, post.id);
        dispatch(removePost(post.id));
      } else if (post.updated) {
        // As the API doesn't support updating posts with Alphanumeric IDs, we have to use the numeric ID by using the first character number of the ID

        await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id.toString()[0]}`, {
          id: post.id,
          content: post.content,
        });
        await markPostAsSynced(db, post.id);
        dispatch(markPostsynced(post.id));
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/posts', {
          id: post.id,
          content: post.content,
        });
        await markPostAsSynced(db, post.id);
        dispatch(markPostsynced(post.id));
      }
    } catch (e) {
      console.log('Sync failed', post.id);
    }
  }
};


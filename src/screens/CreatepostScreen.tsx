import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native-paper';
import {View} from 'react-native';
import PostForm from '../components/PostForm';
import {useDispatch} from 'react-redux';
import {addPost} from '../redux/postsSlice';
import uuid from 'react-native-uuid';
import {getDBconnection, insertPost} from '../services/dbService';
import {isConnected} from '../utils/network';
import axios from 'axios';
import { getLoggedInUser } from '../redux/authService';

const CreatePostScreen = ({navigation}: any) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getLoggedInUser();      
      if (userData) {
        setUserId(userData.id);
        setUsername(userData.username);
      }
      else {
        setUserId(null);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (content: string) => {
    
    if (content.trim() === '') {
      setErrorMessage('Content cannot be empty.');
      return;
    }

    if (!userId) {
      setErrorMessage('User not found. Please log in again.');
      return;
    }
    setLoading(true);
    try{
    const postId = uuid.v4().toString();
    const online = await isConnected();
    const timestamp = new Date().toISOString();

    let newPost = {
      id: postId,
      content,
      synced: false,
      timestamp,
      userId,
      username
    };

    if (online) {
      try {
        await axios.post('https://jsonplaceholder.typicode.com/posts', {
          id: postId,
          content,
          userId,
          timestamp,
        });
        newPost.synced = true;
      } catch (e) {
        console.log('Sync failed, saving offline.');
      }
    }

    const db = await getDBconnection();
    await insertPost(db, newPost);
    dispatch(addPost(newPost));
    navigation.goBack();
  } catch (e) {
     console.error('Post creation failed:', error);
    setErrorMessage('Something went wrong. Please try again.');
  }
    finally {
      setLoading(false);
    }
  }

  return (
    <View style={{flex: 1}}>
          {loading ? (
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating={true} size="large" color="#6A1B9A" />
      </View>
    ) : (
      <PostForm
        onSubmit={handleSubmit}
        initialValue={content}
        setContent={setContent}
        errorMessage={errorMessage}
      />
    )}
    </View>
  );
};

export default CreatePostScreen;

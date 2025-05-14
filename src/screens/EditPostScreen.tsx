import React, {useState} from 'react';
import PostForm from '../components/PostForm';
import {useDispatch} from 'react-redux';
import {editPost} from '../redux/postsSlice';
import {getDBconnection, updatePostContent} from '../services/dbService';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const EditPostScreen = ({route, navigation}: any) => {
  const {post} = route.params;
  const [content, setContent] = useState(post.content);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (updatedContent: string) => {
    if (updatedContent.trim() === '') {
      setErrorMessage('Content cannot be empty.');
      return;
    }
    setLoading(true);
    try {
      const db = await getDBconnection();
      await updatePostContent(db, post.id, updatedContent);
      dispatch(
        editPost({
          id: post.id,
          content: updatedContent,
        }),
      );
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update post:', error);
      setErrorMessage('Update failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#6A1B9A" />
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

export default EditPostScreen;

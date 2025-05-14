import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store';
import PostItem from '../components/PostItem';
import {
  getDBconnection,
  fetchPosts,
  createTables,
  softDeletePost,
} from '../services/dbService';
import {deletePost, setPosts} from '../redux/postsSlice';
import {isConnected} from '../utils/network';
import {syncPosts} from '../services/syncService';
import {getLoggedInUser, logoutUser} from '../redux/authService';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import { Text } from 'react-native-gesture-handler';

const FeedScreen = ({navigation}: any) => {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [loggedInUserId, setLoggedInUser] = useState<any>(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={async () => {
            Alert.alert(
              'Logout Confirmation',
              'Are you sure you want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: async () => {
                    await logoutUser();
                    navigation.replace('Login');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
          style={{marginRight: 15}}>
          <Icon name="logout" size={24} color="#6A1B9A" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);


  useFocusEffect(
    useCallback(() => {
      const loadPosts = async () => {
        setLoading(true);
        const db = await getDBconnection();
        await createTables(db);
        const savedPosts = await fetchPosts(db);
        dispatch(setPosts(savedPosts));

        if (await isConnected()) {
          const unsynced = savedPosts.filter(p => !p.synced);
          await syncPosts(unsynced, dispatch);
        }

        const loggedInUserId = await getLoggedInUser();
        setLoggedInUser(loggedInUserId?.id);
        setLoading(false);
      };

      loadPosts();
    }, [dispatch]),
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async state => {
      if (state.isConnected) {
        const db = await getDBconnection();
        const savedPosts = await fetchPosts(db);
        const unsynced = savedPosts.filter(p => !p.synced);
        if (unsynced.length > 0) {
          setLoading(true);
          await syncPosts(unsynced, dispatch);
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6A1B9A" />
        </View>
      ) : posts.filter(p => !p.deleted).length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts available</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 80}}
          renderItem={({item}) => {
            if (item.deleted) return null;
            return (
              <PostItem
                content={item.content}
                synced={item.synced}
                username={item.username}
                userId={item.userId}
                loggedInUserId={loggedInUserId}
                timestamp={item.timestamp}
                onEdit={() => navigation.navigate('EditPost', {post: item})}
                onDelete={async () => {
                  const db = await getDBconnection();
                  await softDeletePost(db, item.id);
                  dispatch(deletePost(item.id));
                }}
              />
            );
          }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreatePost')}>
        <Icon name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#6A1B9A',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
  },
});

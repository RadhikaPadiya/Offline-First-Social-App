import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface PostItemProps {
  content: string;
  synced: boolean;
  username: string | undefined;
  userId: number | undefined;
  loggedInUserId: number | undefined;
  timestamp: string | undefined;
  onEdit: () => void;
  onDelete: () => void;
}

const PostItem: React.FC<PostItemProps> = ({
  content,
  synced,
  userId,
  username,
  timestamp,
  loggedInUserId,
  onEdit,
  onDelete,
}) => {
  
  const handleDelete = () => {
    if (userId === loggedInUserId) {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this post?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel pressed'),
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: onDelete,
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="account-circle"
          size={30}
          color="#6A1B9A"
        />
        <Text style={styles.username}>{username || 'Unknown User'}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.content}>{content}</Text>
      <View style={styles.footer}>
        <Text style={styles.timestamp}>
          {new Date(timestamp).toLocaleString()}
        </Text>
        <Text style={[styles.status, {color: synced ? 'green' : 'orange'}]}>
          {synced ? 'Synced' : 'Not Synced'}
        </Text>
        {userId === loggedInUserId && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={onEdit} style={styles.iconButton}>
              <Icon name="edit" size={20} color="#6A1B9A" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <Icon name="delete" size={20} color="red" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FAFAFA',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  username: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 6,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  status: {
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
});

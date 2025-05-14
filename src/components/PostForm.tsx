import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

interface PostFormProps {
  onSubmit: (text: string) => void;
  initialValue?: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  errorMessage?: string;
}

const PostForm: React.FC<PostFormProps> = ({
  onSubmit,
  initialValue = '',
  setContent,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#888"
        value={initialValue}
        onChangeText={setContent}
        multiline
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          onSubmit(initialValue);
          setContent('');
        }}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostForm;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    margin: 15,
    backgroundColor: '#f3e8ff',
    borderRadius: 15,
    shadowColor: '#6200ee',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  input: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderColor: '#a66dd4',
    borderWidth: 1,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 80,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 12,
    backgroundColor: '#7e3ff2', 
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
});

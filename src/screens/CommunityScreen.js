import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Card from '../components/Card';
import PrimaryButton from '../components/PrimaryButton';
import { useAppContext } from '../context/AppContext';
import theme from '../theme/theme';

export default function CommunityScreen() {
  const { posts, setPosts } = useAppContext();
  const [composer, setComposer] = useState('');

  const toggleLike = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        const isLiked = !post.liked;
        return {
          ...post,
          liked: isLiked,
          likes: Math.max(0, post.likes + (isLiked ? 1 : -1)),
        };
      })
    );
  };

  const publishPost = () => {
    const trimmedText = composer.trim();
    if (!trimmedText) {
      return;
    }

    setPosts((currentPosts) => [
      {
        id: `post-${Date.now()}`,
        user: 'You',
        text: trimmedText,
        likes: 0,
        liked: false,
      },
      ...currentPosts,
    ]);
    setComposer('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Community Feed</Text>

        <Card>
          <TextInput
            accessibilityLabel="Write a community post"
            value={composer}
            onChangeText={setComposer}
            placeholder="Share your progress..."
            multiline
            style={styles.input}
            textAlignVertical="top"
          />
          <PrimaryButton title="Post update" onPress={publishPost} disabled={!composer.trim()} />
        </Card>

        {posts.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No posts yet. Start the conversation.</Text>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id}>
              <Text style={styles.userName}>{post.user}</Text>
              <Text style={styles.postText}>{post.text}</Text>
              <Text
                accessibilityRole="button"
                accessibilityLabel={`${post.liked ? 'Unlike' : 'Like'} post by ${post.user}`}
                style={styles.likeButton}
                onPress={() => toggleLike(post.id)}
              >
                {post.liked ? '♥' : '♡'} {post.likes}
              </Text>
            </Card>
          ))
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: 100,
  },
  title: {
    fontSize: theme.typography.h2,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radii.md,
    minHeight: 110,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  userName: {
    color: theme.colors.primary,
    fontSize: theme.typography.body,
    fontWeight: '700',
    marginBottom: 6,
  },
  postText: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  likeButton: {
    minHeight: 44,
    alignSelf: 'flex-start',
    paddingVertical: 8,
    color: theme.colors.primary,
    fontWeight: '700',
    fontSize: theme.typography.bodySmall,
  },
  emptyText: {
    color: theme.colors.muted,
    fontSize: theme.typography.bodySmall,
  },
});

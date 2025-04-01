<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Posts</h2>
    <div v-if="loading" class="text-gray-500">Loading posts...</div>
    <div v-else-if="error" class="text-red-500">Error loading posts: {{ error }}</div>
    <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="post in posts" :key="post.title" class="bg-white rounded shadow p-4">
        <h3 class="font-bold text-lg mb-2">{{ post.title }}</h3>
        <div v-if="post.content && post.content.document">
          <p v-for="(item, index) in getFilteredContent(post.content.document)" :key="index">
            {{ item.children[0].text }}
          </p>
        </div>
        <div v-else>
          <p class="text-gray-600">No content available.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);
const loading = ref(false);
const error = ref(null);
const graphqlEndpoint = 'http://localhost:3000/api/graphql';

const getFilteredContent = (documentArray) => {
  return documentArray.filter(
    (item) => item.type === 'paragraph' && item.children && item.children.length > 0
  );
};

onMounted(async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query ExampleQuery {
            posts {
              title
              content {
                document
              }
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      error.value = 'Failed to load posts due to GraphQL errors.';
    } else if (data.data && data.data.posts) {
      posts.value = data.data.posts;
    } else {
      error.value = 'Failed to load posts - unexpected data structure.';
    }
  } catch (err) {
    console.error('Fetch Error:', err);
    error.value = 'Failed to load posts.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
</style>
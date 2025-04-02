<template>
  <div>
    <div v-if="loading" class="text-gray-500">Loading sermons...</div>
    <div v-else-if="error" class="text-red-500">Error loading sermons: {{ error }}</div>
    <div v-else class="grid gap-8 grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      <div v-for="sermon in sermons" :key="sermon.title" class="rounded shadow p-8 hover:bg-gray-100 transition-shadow duration-300">
        <h3 class="font-bold text-lg mb-2">{{ sermon.title }}</h3>
        <div v-if="sermon.summary">
          <p class="text-gray-700 mb-4">{{ sermon.summary }}</p>
        </div>
        <div v-else class="text-gray-600 mb-4">No summary available.</div>

        <div v-if="sermon.speaker && sermon.speaker.name" class="text-sm text-gray-600 mb-2">
          <strong>Speaker:</strong> {{ sermon.speaker.name }}
        </div>
        <div v-if="sermon.church && sermon.church.name" class="text-sm text-gray-600 mb-2">
          <strong>Church:</strong> {{ sermon.church.name }}
          <a v-if="sermon.church.website" :href="sermon.church.website" target="_blank" class="text-blue-500 hover:underline ml-2">
            Visit Website
          </a>
        </div>
        <div v-if="sermon.link" class="mt-4">
          <a :href="sermon.link" target="_blank" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Listen to Sermon
          </a>
        </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sermons = ref([]);
const loading = ref(false);
const error = ref(null);
const graphqlEndpoint = process.env.VUE_APP_API_URL + '/api/graphql';


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
        query SermonQuery {
          sermons {
            church {
              name,
              website
            },
            speaker {
              name,
              sermons {
                link
              }
            },
            title,
            summary,
            link
          }
        }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responsejson = await response.json();

    if (responsejson.errors) {
      console.error('GraphQL Errors:', responsejson.errors);
      error.value = 'Failed to load sermons due to GraphQL errors.';
    } else if (responsejson.data && responsejson.data.sermons) {
      sermons.value = responsejson.data.sermons;
    } else {
      error.value = 'Failed to load sermons - unexpected data structure.';
    }
  } catch (err) {
    console.error('Fetch Error:', err);
    error.value = 'Failed to load sermons.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
</style>
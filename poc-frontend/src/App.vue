<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
    <div class="flex flex-col items-center">
    <div class="bg-white p-8 rounded shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-blue-500">
        Welcome to Vue.js with Tailwind CSS!
      </h1>
      <p class="text-gray-700">This is a basic example.</p>
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Click Me
      </button>
    </div>
  <PostsFetch/>

    </div>
  </div>
</template>

<script>
import PostsFetch from "./components/PostsFetch.vue";

export default {
  name: "App",
  components: {
    PostsFetch,
  },
};
</script>

<style>
/* You can add your component-specific styles here */
</style>

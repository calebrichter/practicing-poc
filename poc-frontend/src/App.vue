<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center">
     <div class="bg-white shadow-md p-6">
      <h1 class="text-2xl font-bold mb-4 text-blue-500 p-8 text-center">
        Check out these sermons
      </h1>
      <SermonsFetch/>
    </div>
  </div>
</template>

<script>
import SermonsFetch from "./components/SermonsFetch.vue";

export default {
  name: "App",
  components: {
    SermonsFetch,
  },
};
</script>

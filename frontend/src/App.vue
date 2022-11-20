<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'App',
  setup () {
    const userStore = useUserStore();

    onMounted(() => {
      userStore.checkLoginStatus();
    });
  }
});
</script>

<template>
  <router-view />
</template>


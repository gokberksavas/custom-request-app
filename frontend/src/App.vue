<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useUserStore } from './stores/user';


export default defineComponent({
  name: 'App',
  setup() {
    const { checkAndRefreshToken } = useUserStore();

    onMounted(() => {
      checkAndRefreshToken();
    });
  }
});
</script>

<template>
  <router-view />
</template>


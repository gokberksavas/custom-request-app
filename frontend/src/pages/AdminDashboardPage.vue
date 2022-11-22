<script lang="ts">
import { defineComponent } from 'vue';
import AdminDashboard from 'src/components/AdminDashboard.vue';

export default defineComponent({
  name: 'AdminDashboardPage',
  components: {
    AdminDashboard
  }
})
</script>

<template>
  <AdminDashboard  />
</template>
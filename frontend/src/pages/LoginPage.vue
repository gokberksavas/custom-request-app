<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from 'components/LoginForm.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm
  }
});
</script>

<template>
  <LoginForm />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import RequestForm from 'components/RequestForm.vue';

export default defineComponent({
  name: 'RequestFormPage',
  components: {
    RequestForm,
  },
});
</script>

<template>
  <RequestForm />
</template>

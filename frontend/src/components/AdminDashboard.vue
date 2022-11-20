<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AdminDashboard',
  setup () {
    const router = useRouter();
    const orders = ref([]);

    fetch('http://localhost:3000/orders', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('auth-token')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .catch((err) => {
        console.error(err);

        router.push({ path: '/login' });
      });
  }
});
</script>
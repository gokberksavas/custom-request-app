<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';

interface Order {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  description: string;
  created_at: string;
  resolved: boolean;
}

export default defineComponent({
  name: 'AdminDashboard',
  setup() {
    const orders: Ref<Order[]> = ref([]);
    const getAllOrders = () => {
      fetch('http://localhost:3000/orders', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => (orders.value = data));
    };

    const tableColConfig = [
      {
        name: 'id',
        label: 'İstek ID',
        field: (row:Order) => row.id,
        align: 'left',
      },
      {
        name: 'full_name',
        label: 'Ad Soyad',
        field: (row: Order) => row.full_name,
        align: 'left',
      },
      {
        name: 'email',
        label: 'Email',
        field: (row: Order) => row.email,
        align: 'left',
      },
      {
        name: 'phone_number',
        label: 'Telefon',
        field: (row: Order) => row.phone_number,
        align: 'left',
      },
      {
        name: 'description',
        label: 'Açıklama',
        field: (row: Order) => row.description,
        align: 'left',
      },
      {
        name: 'created_at',
        label: 'Oluşturulma Tarihi',
        field: (row: Order) => row.created_at,
        format: (val, row: Order) => new Date(val).toLocaleDateString('tr'),
        align: 'left',
      },
      {
        name: 'resolved',
        label: 'Durum',
        field: (row: Order) => row.resolved,
        align: 'left',
      }
    ];

    onMounted(() => {
      getAllOrders();
    });

    return {
      orders,
      tableColConfig,
    }
  },
});
</script>

<template>
  <div class="flex column col-grow">
    <q-table  :rows="orders" :columns="tableColConfig"/>
  </div>
</template>

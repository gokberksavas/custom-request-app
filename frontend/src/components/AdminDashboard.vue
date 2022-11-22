<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import type { Ref } from 'vue';
import { QTableColumn } from 'quasar';

export default defineComponent({
  name: 'AdminDashboard',
  setup() {
    const orders: Ref<QTableColumn[]> = ref([]);
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

    const tableColConfig: QTableColumn[] = [
      {
        name: 'id',
        label: 'İstek ID',
        field: (row) => row.id,
        align: 'left',
      },
      {
        name: 'full_name',
        label: 'Ad Soyad',
        field: (row) => row.full_name,
        align: 'left',
      },
      {
        name: 'email',
        label: 'Email',
        field: (row) => row.email,
        align: 'left',
      },
      {
        name: 'phone_number',
        label: 'Telefon',
        field: (row) => row.phone_number,
        align: 'left',
      },
      {
        name: 'description',
        label: 'Açıklama',
        field: (row) => row.description,
        align: 'left',
      },
      {
        name: 'created_at',
        label: 'Oluşturulma Tarihi',
        field: (row) => row.created_at,
        format: (val: string) => new Date(val).toLocaleDateString('tr'),
        align: 'left',
      },
      {
        name: 'resolved',
        label: 'Durum',
        field: (row) => row.resolved,
        align: 'left',
      },
    ];

    onMounted(() => {
      getAllOrders();
    });

    return {
      orders,
      tableColConfig,
    };
  },
});
</script>

<template>
  <div class="full-width">
    <q-table
      title="İstek Listesi"
      bordered
      :style="{ height: '600px' }"
      :rows="orders"
      :columns="tableColConfig"
      virtual-scroll
      row-key="name"
    />
  </div>
</template>

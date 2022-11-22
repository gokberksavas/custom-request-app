<script lang="ts">
import { defineComponent, ref } from 'vue';
import RequestTable from 'src/components/RequestTable.vue';
import { useUserStore } from 'src/stores/user';

export default defineComponent({
  name: 'AdminDashboardPage',
  components: {
    RequestTable,
  },
  setup() {
    const userStore = useUserStore();
    const activeUser = ref(userStore.activeUser);

    return {
      activeUser,
    };
  },
});
</script>

<template>
  <div class="flex column full-width">
    <div class="column-xs row-sm justify-start q-mb-md">
      <q-card class="bg-grey-2">
        <q-card-section class="column justify-center items-start">
          <div
            class="row full-width justify-between items-center"
            style="margin-bottom: .25rem"
          >
            <div class="text-h5">{{ activeUser.full_name }}</div>
            <div class="text-primary text-weight-bold text-body2 text-italic">{{ `#${activeUser.id}` }}</div>
          </div>
          <div class="text-body2 text-italic text-grey-7 text-weight-regular">{{ activeUser.email }}</div>
        </q-card-section>
      </q-card>
      <div class="flex row-xs column-sm justify-xs-start justify-sm-between q-mt-xs-sm q-mt-sm-none q-ml-sm-md">
        <q-btn
          :no-caps="true"
          label="Kullanıcı Ekle"
          color="primary"
          size=".75rem"
          :style="{ width: '130px', height: '40px' }"
          class="q-mr-xs-sm q-mr-sm-none"
        />
        <q-btn
          :no-caps="true"
          label="Kullanıcı Sil"
          outline
          class="text-weight-bold"
          color="negative"
          size=".75rem"
          :style="{ width: '130px', height: '40px' }"
        />
      </div>
    </div>
    <RequestTable />
  </div>
</template>

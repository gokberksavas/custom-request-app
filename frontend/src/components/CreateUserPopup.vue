<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue';
import type { Ref } from 'vue';
import { ROLES } from 'src/enums';

export default defineComponent({
  name: 'CreateUserPopup',
  props: {
    show: Boolean,
  },
  emits: ['popup-closed'],
  setup(props, { emit }) {
    const formData = reactive({
      name: '',
      email: '',
      password: '',
      role: '',
    });
    const roleOptions = Object.keys(ROLES).map((key) => {
      return {
        label: ROLES[key as keyof typeof ROLES],
        value: ROLES[key as keyof typeof ROLES],
      };
    });

    const showDialog: Ref<boolean> = ref(props.show);
    const show = computed(() => props.show);

    const onClose = () => {
      showDialog.value = false;
      emit('popup-closed');
    };

    watch(show, (newShow) => {
      showDialog.value = newShow;
    });

    return {
      showDialog,
      formData,
      roleOptions,
      onClose,
    };
  },
});
</script>

<template>
  <q-dialog v-model="showDialog" @hide="onClose">
    <q-card :style="{ height: 'auto', width: '550px', padding: '1rem' }">
      <q-card-section>
        <div class="text-h5 text-center">Yeni Kullanıcı Oluştur</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <q-input
            v-model="formData.name"
            label="Kullanıcı Adı"
            class="q-mb-md"
            filled
          />
          <q-input
            v-model="formData.email"
            label="Kullanıcı Email"
            class="q-mb-md"
            filled
          />
          <q-input
            v-model="formData.password"
            label="Kullanıcı Şifresi"
            class="q-mb-md"
            filled
          />
          <q-select
            v-model="formData.role"
            label="Kullanıcı Rolü"
            class="q-mb-md"
            :options="roleOptions"
            filled
          />
        </q-form>
      </q-card-section>
      <q-card-section class="flex row justify-center q-pa-none">
        <q-btn label="Tamam" color="primary" size="md" />
        <q-btn
          label="Kapat"
          color="negative"
          @click="onClose"
          size="md"
          class="q-ml-sm"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

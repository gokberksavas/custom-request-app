<script lang="ts">
import { defineComponent, ref, watch, computed, reactive } from 'vue';
import type { Ref } from 'vue';
import { ROLES } from 'src/enums';
import * as validation from '../utilities/validate-inputs';

export default defineComponent({
  name: 'CreateUserPopup',
  props: {
    show: Boolean,
  },
  emits: ['popup-closed'],
  setup(props, { emit }) {
    const formData = reactive({
      full_name: '',
      email: '',
      password: '',
      role: '',
    });
    const roleOptions = Object.keys(ROLES).map((key) => {
      return ROLES[key as keyof typeof ROLES];
    });

    const showDialog: Ref<boolean> = ref(props.show);
    const show = computed(() => props.show);

    const onClose = () => {
      showDialog.value = false;
      emit('popup-closed');
    };

    const handleSubmit = () => {
      fetch(`${process.env.API}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
    };

    const disableSubmitButton: Ref<boolean> = ref(true);

    watch(show, (newShow) => {
      showDialog.value = newShow;
    });

    watch(formData, (newData) => {
      disableSubmitButton.value = !(
        validation.validateName(newData.full_name) &&
        validation.validateEmail(newData.email) &&
        validation.validatePassword(newData.password) &&
        newData.role !== ''
      );
    })

    return {
      showDialog,
      formData,
      roleOptions,
      onClose,
      handleSubmit,
      disableSubmitButton
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
        <q-form @submit="handleSubmit">
          <q-input
            v-model="formData.full_name"
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
            hint="En az 8 karakter, 1 harf ve 1 sayı içermeli!"
            hide-hint
            :hide-bottom-space="true"
            filled
          />
          <q-select
            v-model="formData.role"
            label="Kullanıcı Rolü"
            class="q-mb-md"
            :options="roleOptions"
            filled
          />
          <div class="flex justify-center">
            <q-btn label="Tamam" color="primary" size="md" type="submit" :disable="disableSubmitButton"/>
            <q-btn
              label="Kapat"
              color="negative"
              @click="onClose"
              size="md"
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

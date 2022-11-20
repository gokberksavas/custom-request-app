<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import type { Ref } from 'vue';
import * as validation from '../utils/validate-inputs';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RequestForm',
  setup() {
    const formData = reactive({
      full_name: '',
      email: '',
      phone_number: '',
      description: '',
    });
    const formStatus: Ref<'success' | 'fail' | 'submitted' | ''> = ref('');

    const onSubmit = () => {
      formStatus.value = 'submitted';

      fetch('http://localhost:3000/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(() => setTimeout(() => formStatus.value = 'success', 3000))
        .catch((err) => {
          console.error(err);
          formStatus.value = 'fail';
        });
    };

    const buttonDisabled: Ref<boolean> = ref(true);

    watch(formData, () => {
      buttonDisabled.value = !(
        validation.validateName(formData.full_name) &&
        validation.validateEmail(formData.email) &&
        validation.validatePhoneNumber(formData.phone_number) &&
        validation.validateDescription(formData.description)
      );
    });

    const router = useRouter();
    const showDialog: Ref<boolean> = ref(false);
    const dialogConfig = {
      success: {
        icon: 'task_alt',
        color: 'positive',
        text: 'Form başarıyla gönderildi!'
      },
      fail: {
        icon: 'cancel',
        color: 'negative',
        text: 'Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
      }
    }

    watch(formStatus, (newStatus) => {
      if (newStatus === 'success') {
        showDialog.value = true;

        setTimeout(() => { router.push({ path: '/' }) }, 3000);
      } else if (newStatus === 'fail') {
        showDialog.value = true;

        setTimeout(() => { router.go(0) }, 3000);
      }
    });

    return {
      formData,
      onSubmit,
      validation,
      buttonDisabled,
      formStatus,
      showDialog,
      dialogConfig
    };
  },
});
</script>

<template>
  <div class="col-md-6 col-sm-9 col-xs-grow flex column justify-center">
    <div class="text-h4 q-py-sm q-mb-md">İstek Formu</div>
    <q-form class="text-center">
      <q-input
        v-model="formData.full_name"
        type="text"
        label="Ad Soyad"
        class="q-mb-md"
        filled
        :error="
          !!formData.full_name && !validation.validateName(formData.full_name)
        "
        error-message="Lütfen geçerli bir Ad Soyad giriniz!"
        :disable="formStatus === 'submitted'"
      />
      <q-input
        v-model="formData.email"
        type="email"
        label="Email"
        class="q-mb-md"
        filled
        :error="!!formData.email && !validation.validateEmail(formData.email)"
        error-message="Lütfen geçerli bir Email giriniz!"
        :disable="formStatus === 'submitted'"
      />
      <q-input
        v-model="formData.phone_number"
        type="tel"
        label="Telefon Numarası"
        class="q-mb-md"
        filled
        :error="
          !!formData.phone_number &&
          !validation.validatePhoneNumber(formData.phone_number)
        "
        error-message="Lütfen geçerli bir Telefon Numarası giriniz!"
        :disable="formStatus === 'submitted'"
      />
      <q-input
        v-model="formData.description"
        type="textarea"
        label="Açıklama"
        class="q-mb-md"
        autogrow
        filled
        :error="
          !!formData.description &&
          !validation.validateDescription(formData.description)
        "
        error-message="Lütfen geçerli bir Açıklama giriniz!"
        :disable="formStatus === 'submitted'"
      />
      <q-btn
        color="primary"
        text-color="white"
        label="GÖNDER"
        :no-caps="true"
        @click="onSubmit"
        :disable="buttonDisabled || formStatus === 'submitted'"
      />
      <q-linear-progress
        v-if="formStatus === 'submitted'"
        class="q-mt-lg"
        color="primary"
        indeterminate
        size=".25rem"
      />
    </q-form>
    <q-dialog v-model="showDialog">
      <q-card class="flex column items-center q-pa-md">
        <q-card-section>
          <q-icon
            :name="dialogConfig[formStatus as keyof typeof dialogConfig].icon"
            :color="dialogConfig[formStatus as keyof typeof dialogConfig].color"
            size="4rem"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">{{dialogConfig[formStatus as keyof typeof dialogConfig].text}}</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

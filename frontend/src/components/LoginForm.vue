<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from 'stores/user';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const { userLogin } = useUserStore();
    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const buttonDisabled: Ref<boolean> = ref(true);

    watch([email, password], ([newEmail, newPassword]) => {
      buttonDisabled.value = !(newEmail && newPassword)
    });

    return {
      email,
      password,
      buttonDisabled,
      userLogin
    };
  },
});
</script>

<template>
  <div class="col-md-6 col-sm-9 col-xs-grow flex column justify-center">
    <div class="text-h4 q-mb-md q-py-sm">Giriş Yap</div>
    <q-form class="text-center">
      <q-input
        v-model="email"
        type="email"
        label="Email"
        filled
        class="q-mb-md"
      />
      <q-input
        v-model="password"
        type="password"
        label="Şifre"
        filled
        class="q-mb-md"
      />
      <q-btn 
        label="GİRİŞ YAP"
        color="primary"
        text-color="white"
        :no-caps="true"
        :disable="buttonDisabled"
        @click="userLogin({ email: email, password: password })"
      />
    </q-form>
  </div>
</template>

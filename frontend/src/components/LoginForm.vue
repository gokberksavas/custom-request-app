<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { useUserStore } from 'stores/user';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const { userLogin } = useUserStore();
    const email: Ref<string> = ref('');
    const password: Ref<string> = ref('');
    const buttonDisabled: Ref<boolean> = ref(true);
    const errorPopupActive: Ref<boolean> = ref(false);
    const loadingState = ref(false);
    const router = useRouter();

    const handleLogin = async () => {
      loadingState.value = true;

      const loginSuccess = await userLogin({ email: email.value, password: password.value });

      loginSuccess ? router.push({ path: '/' }) : handleError();
    };

    const handleError = () => {
      errorPopupActive.value = true;

      setTimeout(() => {
        errorPopupActive.value = false;
        loadingState.value = false;
        email.value = '';
        password.value = '';
      }, 3000);
    }

    watch([email, password], ([newEmail, newPassword]) => {
      buttonDisabled.value = !(newEmail && newPassword)
    });

    return {
      email,
      password,
      buttonDisabled,
      handleLogin,
      loadingState,
      errorPopupActive
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
        autocomplete="off"
        :disable="loadingState"
      />
      <q-input
        v-model="password"
        type="password"
        label="Şifre"
        filled
        class="q-mb-md"
        autocomplete="off"
        :disable="loadingState"
      />
      <q-btn 
        label="GİRİŞ YAP"
        color="primary"
        text-color="white"
        :no-caps="true"
        :disable="buttonDisabled || loadingState"
        @click="handleLogin"
      />
    </q-form>
    <q-dialog v-model="errorPopupActive">
      <q-card>
        <q-card-section class="text-center">
          <q-icon 
            name="cancel"
            color="negative"
            size="3rem"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-body1">Giriş sırasında bir hata oluştu, lütfen tekrar deneyin!</div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-linear-progress v-if="loadingState" class="q-mt-md" size=".25rem" color="primary" indeterminate/>
  </div>
</template>

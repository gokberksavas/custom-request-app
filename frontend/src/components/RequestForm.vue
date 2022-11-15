<script lang="ts">
import { QInputProps } from 'quasar';
import { defineComponent, Ref, ref, watch } from 'vue';
import { createRequest } from '../utils/Api'
import { useRouter } from 'vue-router'

interface FormState {
  full_name: string;
  phone_number: string;
  email: string;
  description: string;
}

interface InputConfig {
  name: string;
  type: QInputProps['type'];
  label: string;
  validation: validateFunction;
  errorMessage: string;
}

type validateFunction = () => boolean;

export default defineComponent({
  name: 'RequestForm',
  setup() {
    const inputConfig: InputConfig[] = [
      {
        name: 'full_name',
        type: 'text',
        label: 'Ad Soyad',
        validation: () => validateName(),
        errorMessage: 'Lütfen geçerli bir Ad Soyad giriniz.',
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        validation: () => validateEmail(),
        errorMessage: 'Lütfen geçerli bir Email giriniz.',
      },
      {
        name: 'phone_number',
        type: 'tel',
        label: 'Telefon Numarası',
        validation: () => validatePhoneNumber(),
        errorMessage: 'Lütfen geçerli bir Telefon Numarası giriniz',
      },
      {
        name: 'description',
        type: 'textarea',
        label: 'Açıklama',
        validation: () => validateDescription(),
        errorMessage: 'Lütfen geçerli bir Açıklama giriniz.',
      },
    ];

    const form: Ref<FormState> = ref({
      full_name: '',
      phone_number: '',
      email: '',
      description: '',
    });

    const isButtonDisabled: Ref<boolean> = ref(true);
    const loadingButton: Ref<boolean> = ref(false);
    const formSubmitted: Ref<boolean> = ref(false);
    const animateIcon: Ref<boolean> = ref(formSubmitted);
    const router = useRouter();

    const validateName = (): boolean => form.value.full_name.length >= 5;

    const validatePhoneNumber = (): boolean => form.value.phone_number.length === 11;

    const validateDescription = (): boolean => form.value.description.length >= 10;

    const validateEmail = (): boolean => {
      var inputElement: HTMLInputElement = document.createElement('input');
      var email = form.value.email;

      inputElement.type = 'email';
      inputElement.required = true;
      inputElement.value = email;

      return email !== '' && typeof inputElement.checkValidity === 'function'
        ? inputElement.checkValidity()
        : /\S+@\S+\.\S+/.test(email);
    };

    const getErrorStatus = (config: InputConfig): boolean => {
      const fieldValue = form.value[config.name as keyof FormState];

      return fieldValue === '' ? false : !config.validation();
    };

    const handleSubmit = async () => {
      loadingButton.value = true;

      createRequest(form.value)
        .then(res => console.log(res))
        .then(() => {
          formSubmitted.value = true

          setTimeout(() => {
            router.push({path: '/'});
          }, 4000)
        })
        .catch(err => console.log(err));
    };

    watch(form.value, () => {
      isButtonDisabled.value = !(
        validateName() &&
        validateEmail() &&
        validatePhoneNumber() &&
        validateDescription()
      );
    });

    return {
      form,
      inputConfig,
      getErrorStatus,
      isButtonDisabled,
      handleSubmit,
      loadingButton,
      formSubmitted,
      animateIcon,
    };
  },
});
</script>

<template>
  <div
    v-if="!formSubmitted"
    class="flex column justify-center full-height form-wrapper"
  >
    <div class="flex row justify-start q-py-md q-mb-md text-h4">
      Bize Ulaşın
    </div>
    <q-form class="col-grow">
      <q-input
        v-for="(config, index) in inputConfig"
        :key="index"
        v-model="form[config.name as keyof FormState]"
        :error="getErrorStatus(config)"
        :error-message="config.errorMessage"
        :name="config.name"
        :type="config.type"
        debounce="150"
        :label="config.label"
        outlined
        :autogrow="config.type === 'textarea'"
        class="flex column items-center form-input"
        color="primary"
        bg-color="white"
      />
      <div class="flex row justify-center">
        <q-btn
          text-color="white"
          color="primary"
          size="md"
          :disable="isButtonDisabled"
          @click="handleSubmit"
          :no-caps="true"
          :loading="loadingButton"
          er
        >
          GÖNDER
          <template v-slot:loading>
            <q-spinner color="white" size="1em" :thickness="6" />
          </template>
        </q-btn>
      </div>
    </q-form>
  </div>
  <Transition name="form-confirmation">
    <div
      v-if="formSubmitted"
      class="flex col-grow justify-center items-center full-height full-width"
    >
      <div class="flex column items-center form-confirmation-content">
        <q-icon
          name="task_alt"
          size="4rem"
          class="q-mb-md"
          :class="{ 'icon-animated': animateIcon }"
          color="positive"
        />
        <div class="text-h5">Form Başarıyla Gönderildi!</div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.form-wrapper {
  .form-input {
    margin-bottom: 0.5rem;
  }

  .q-textarea textarea {
    min-height: 100px !important;
  }
}

.form-confirmation-enter-from {
  opacity: 0;
}

.form-confirmation-enter-to {
  opacity: 1;
}

.form-confirmation-enter-active {
  transition: opacity 1s ease;
}

@keyframes success-icon {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.icon-animated {
  animation-name: success-icon;
  animation-duration: 2s;
  animation-iteration-count: 2;
}
</style>

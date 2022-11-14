<script lang="ts">
import { QInputProps } from 'quasar';
import { defineComponent, Ref, ref, watch } from 'vue';

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
      full_name: 'gokberk',
      phone_number: '12312312312',
      email: 'askdaklsjdas@gmail.com',
      description: 'aksdajshdjahsdjahsjdh',
    });

    const isButtonDisabled = ref(true);
    const loadingButton = ref(false);
    const formSubmitted = ref(false);
    const animateIcon = ref(false);

    const validateName = (): boolean => {
      return form.value.full_name !== '' && form.value.full_name.length >= 5;
    };

    const validatePhoneNumber = (): boolean => {
      return (
        form.value.phone_number !== '' && form.value.phone_number.length === 11
      );
    };

    const validateDescription = (): boolean => {
      return (
        form.value.description !== '' && form.value.description.length >= 10
      );
    };

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
      var formData = form.value;

      loadingButton.value = true;

      await fetch('http://localhost:3000/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((data) => {
          console.log(data);

          formSubmitted.value = true;
          animateIcon.value = true;
        })
        .catch((err) => console.log(err))
        .finally(() => {
          console.log('finally');
        });
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
        debounce="250"
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
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.icon-animated {
  animation-name: success-icon;
  animation-duration: 2s;
}
</style>
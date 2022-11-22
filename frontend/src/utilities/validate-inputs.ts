export const validateName = (name:string) :boolean => {
  const nameRegex = new RegExp(/^[a-zA-ZçıüğöşÇIÜĞÖŞ\s]{5,}$/);

  return nameRegex.test(name);
};

export const validateEmail = (email:string) :boolean => {
  const inputElement: HTMLInputElement = document.createElement('input');

  inputElement.type = 'email';
  inputElement.required = true;
  inputElement.value = email;

  return typeof inputElement.checkValidity === 'function'
    ? inputElement.checkValidity()
    : /\S+@\S+\.\S+/.test(email)
};

export const validatePhoneNumber = (phoneNumber: string): boolean => phoneNumber.length === 11;

export const validateDescription = (description: string): boolean => description.length >= 10;

export const validatePassword = (password: string): boolean => {
  const passwordRegex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&^_-]{8,}$/);

  return passwordRegex.test(password);
}

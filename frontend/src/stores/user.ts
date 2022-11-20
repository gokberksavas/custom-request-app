import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    activeUser: {},
  }),
  actions: {
    async userLogin(credentials: { email: string, password: string }) {
      try {
        const { email, password } = credentials;
        const response = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email, password: password })
        });
        const data = await response.json();

        this.activeUser = data.user;

        window.localStorage.setItem('auth-token', data.token);
        window.localStorage.setItem('user-profile', JSON.stringify(data.user));
      } catch (err) {
        console.error(err);
      }
    },
    checkLoginStatus () {
      const userProfile = JSON.parse(window.localStorage.getItem('user-profile') || '{}');
      const authToken = window.localStorage.getItem('auth-token');

      if (!userProfile || !authToken) {
        window.localStorage.removeItem('user-profile');
        window.localStorage.removeItem('auth-token');
  
        this.$reset();
  
        return false;
      }

      this.activeUser = userProfile;

      return true;
    },
    logOut () {
      window.localStorage.removeItem('user-profile');
      window.localStorage.removeItem('auth-token');

      this.$reset();
    }
  }
});

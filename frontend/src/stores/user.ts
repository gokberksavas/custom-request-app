import { defineStore } from 'pinia';
import * as jose from 'jose';

export interface ActiveUser {
  id?: string;
  email?: string;
  full_name?: string;
  role?: 'SUPERADMIN'| 'ADMIN' | 'USER'
}

export const useUserStore = defineStore('user', {
  state: () => ({
    activeUser: <ActiveUser> {},
  }),
  getters: {
    role: (state) => state.activeUser.role
  },
  actions: {
    async userLogin(credentials: { email: string, password: string }) {
      const { email, password } = credentials;
      const response = await fetch(`${process.env.API}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      });
      const data = await response.json();

      this.activeUser = data.user;

      if (data.user) {
        window.localStorage.setItem('auth-token', data.token);
        window.localStorage.setItem('user-profile', JSON.stringify(data.user));

        return true;
      }

      return false;
    },
    checkLoginStatus() {
      const userProfile = JSON.parse(window.localStorage.getItem('user-profile') || '{}');
      const authToken = window.localStorage.getItem('auth-token') || '';
      const decodedToken = authToken && jose.decodeJwt(authToken);
      const expired = decodedToken && (new Date().getTime() / 1000) >= (decodedToken.exp || 0) ? true : false;

      if (!userProfile || !authToken || expired) {
        window.localStorage.removeItem('user-profile');
        window.localStorage.removeItem('auth-token');
  
        this.$reset();

        return false;
      }

      this.activeUser = userProfile;

      return true;
    },
    logOut() {
      window.localStorage.removeItem('user-profile');
      window.localStorage.removeItem('auth-token');

      this.$reset();
    }
  }
});

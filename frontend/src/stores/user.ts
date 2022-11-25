import { defineStore } from 'pinia';
import * as jose from 'jose';

export interface ActiveUser {
  id?: string;
  email?: string;
  full_name?: string;
  role?: 'SUPERADMIN' | 'ADMIN' | 'USER';
}

export const useUserStore = defineStore('user', {
  state: () => ({
    activeUser: <ActiveUser>{},
    loggedIn: false,
  }),
  getters: {
    role: (state) => state.activeUser.role,
  },
  actions: {
    async userLogin(credentials: { email: string; password: string }) {
      const { email, password } = credentials;
      const response = await fetch(`${process.env.API}/user/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const { accessToken } = await response.json();
        const user = jose.decodeJwt(accessToken).user;

        window.localStorage.setItem('auth-token', accessToken);

        this.activeUser = user as ActiveUser;
        this.loggedIn = true;
      } else {
        const { url, statusText, status } = response;

        throw new Error(`${statusText} ${url} ${status}`);
      }
    },
    checkAndRefreshToken() {
      const authToken = window.localStorage.getItem('auth-token') || '';
      let tokenExpired;

      if (authToken) {
        const decodedToken = jose.decodeJwt(authToken);
        tokenExpired =
          decodedToken && new Date().getTime() / 1000 >= (decodedToken.exp || 0)
            ? true
            : false;
        
        if (!tokenExpired) {
          this.activeUser = decodedToken.user as ActiveUser;
          this.loggedIn = true;
        }
      }

      if (!authToken || tokenExpired) { 
        window.localStorage.removeItem('auth-token');

        fetch(`${process.env.API}/user/refresh`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(async (res) => {
            if (res.ok) {
              const resJSON = await res.json();
              
              return resJSON;
            }

            throw new Error(`${res.url} ${res.statusText} ${res.status}`);
          })
          .then((data) => {
            const { accessToken } = data;

            window.localStorage.setItem('auth-token', accessToken);

            this.activeUser = jose.decodeJwt(accessToken).user as ActiveUser;
            this.loggedIn = true;
          })
          .catch((err) => {
            console.error(err);

            this.$reset();
          });
      }
    },
    logout() {
      window.localStorage.removeItem('auth-token');

      this.$reset();
    },
  },
});

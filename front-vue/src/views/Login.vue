<script>
import axios from 'axios';
export default {
      data() {
        return{
          email: '',
          password: ''
        } 
      },
methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:1337/api/auth/local', {
          identifier: this.email,
          password: this.password,
        });

        console.log('User profile', response.data.user.Roles);
        console.log('User token', response.data.jwt);
        this.$router.push({ name: 'mood' })
      } catch (error) {
        console.log('An error occurred:', error.response);
      }
    },
  },
};
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h1 class="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-yellow-400">Moodly</h1>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-black">Email</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-200 placeholder:text-yellow-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-black">Mot de passe</label>
          </div>
          <div class="mt-2">
            <input
              id="password"
              type="password"
              name="password"
              v-model="password"
              autocomplete="current-password"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-200 placeholder:text-yellow-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>

        <div>
          <button
            @click.prevent="login"
            class="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Se connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
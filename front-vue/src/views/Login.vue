<script>
import axios from 'axios';

const token1 = '5cb7857127429627d59e735594d07ee35651e94cd950b75289714c650af667fade52a57f7a7cde758db8a0db03d9b288428481fe66fce08a3c28e5e2161643539c974cd11862af8d66f95f54b6837ab485128f90857b114d7e21c6fee148de22cf6600131d2a66710ab753883536bcf222c4cd15682488bcca0e7c978a01ffc2'

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
     async login() {
      try {
        const response = await axios.post('http://localhost:1337/auth/local', {
          headers: {
            Authorization: `Bearer ${token}`,
            },
          identifier: this.email,
          password: this.password,
        });

        const token = response.data.jwt;
        consol.log(response.data.jwt)
        localStorage.setItem('token', token);

        const user = response.data.user;

        if (token) {
          if (token === '5cb7857127429627d59e735594d07ee35651e94cd950b75289714c650af667fade52a57f7a7cde758db8a0db03d9b288428481fe66fce08a3c28e5e2161643539c974cd11862af8d66f95f54b6837ab485128f90857b114d7e21c6fee148de22cf6600131d2a66710ab753883536bcf222c4cd15682488bcca0e7c978a01ffc2') {
            this.$router.push('/Moood');
          } else if (token === '') {
            this.$router.push('/Dashboard');
          } else {
            console.error('Type de jeton inattendu');
          }
          } else {
            console.error('Format de jeton invalide');
          }
      } catch (error) {
        console.error('Erreur d\'authentification', error);
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
        <form class="space-y-6" action="#" method="POST" @submit.prevent= "login">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-black">Email</label>
            <div class="mt-2">
              <input id="email" v-model="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-200 placeholder:text-yellow-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 p-2"/>
            </div>
          </div>    
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-black">Mot de passe</label>
            </div>
            <div class="mt-2">
              <input id="password" name="password" v-model="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-yellow-200 placeholder:text-yellow-300 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 p-2" />
            </div>
          </div>
  
          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Se connecter</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  

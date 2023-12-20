<script setup>
import carousel  from '../components/Carousel.vue'
</script>


<template>

<div class="flex h-screen pt-10 pb-24 flex-1 flex-col justify-between ">
    
  <div class="sm:mx-auto sm:max-w-sm">
      <h1 class=" text-center text-2xl font-bold tracking-tight text-black">Quel est votre mood aujourd'hui ?</h1>
  </div>


      <div class="flex items-center justify-center">
        <carousel />
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Valider</button>
      </div>
        
  </div>
</template>


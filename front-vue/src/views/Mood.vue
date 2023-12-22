<!-- <script setup>
import carousel  from '../components/Carousel.vue'
</script> -->

<script>
import axios from 'axios';

const token = '9e24ba9686ab215cf8c97f400b47ea4fbe0af2308070435df2e0cde35ae27c492d3cb451468b0c497148835f4cd4892d261f2204ebf4c5cddb8da530de7258f0cc95ce0c3522f43d4cf10bad125229981cb216573edeaabaf2092bfc755192b6c76e371a05e2e58ae652d41970152fc23af2b85f76494cd9114b6608c454750c';

export default {
    data() {
        return {
            currentEmojiIndex: 0,
            mood: [],
        };
    },
    methods: {
        updateCarousel() {
            const offset = -100 * this.currentEmojiIndex;
            this.$refs.carouselContainer.style.transform = `translateX(${offset}%)`;
            this.displayCurrentMood();
            this.getCurrentMoodId();
        },
        displayCurrentMood() {
            if (this.$refs.carouselContainer.children.length > 0 && this.currentEmojiIndex < this.$refs.carouselContainer.children.length) {
                const currentMoodElement = this.$refs.carouselContainer.children[this.currentEmojiIndex];
                const currentMoodText = currentMoodElement.querySelector('p').textContent;
                console.log('Humeur actuelle:', currentMoodText);
            }
        },
        getCurrentMoodId() {
            if (this.$refs.carouselContainer.children.length > 0 && this.currentEmojiIndex < this.$refs.carouselContainer.children.length) {
                const currentMoodElement = this.$refs.carouselContainer.children[this.currentEmojiIndex];
                const currentMoodId = currentMoodElement.querySelector('p').id;
                console.log('Id du mood display:', currentMoodId);
                return currentMoodId;
            }
        },
        dataMood(){
            axios
            .get('http://localhost:1337/api/moods?populate=*', {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                // Handle success.
                console.log('Data: ', response.data);
                this.mood = response.data.data;
                console.log('Moods: ', this.mood);
            })
            .catch(error => {
                // Handle error.
                console.log('An error occurred:', error.response);
            });
        },
        getDate(){
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            console.log(date);
            console.log(typeof(date));
        },
        async postChoix(){
          // try {
          //   const response = await axios.post('http://localhost:1337/api/choixes', {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     },
          //     {
          //       Date: this.getDate(),
          //       mood: this.getCurrentMoodId(),
          //     });
          //   console.log('Data: ', response.data);
          //   console.log('Mood envoyé avec succès');
          // } catch (error) {
          //   console.log('An error occurred:', error.response);
          // }

          try {
            const response = await axios.post('http://localhost:1337/api/choixes', {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                data: {
                    Date: this.getDate(),
                    mood: this.getCurrentMoodId(),
                },
            });
            console.log('Data: ', response.data);
            console.log('Mood envoyé avec succès');
          } catch (error) {
            console.log('An error occurred:', error.response);
          }
          
          // axios
          //   .post('http://localhost:1337/api/choixes', {
          //       headers: {'Content-Type': 'application/json',
          //       Authorization: `Bearer ${token}`,
          //       },
          //       data: {
          //           Date: this.getDate(),
          //           mood: this.getCurrentMoodId(),
          //       },
          //   })
          //   .then(response => {
          //       // Handle success.
          //       console.log('Data: ', response.data);
          //       console.log('Mood envoyé avec succès');
          //   })
          //   .catch(error => {
          //       // Handle error.
          //       console.log('An error occurred:', error.response);
          //   });


          // axios({
          //   method: 'POST',
          //   url: 'http://localhost:1337/api/choixes',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     Authorization: `Bearer ${token}`,
          //   },
          //   data: {
          //     'Date': this.getDate(),
          //     'mood': this.getCurrentMoodId(),
          //   },
          // })
          //   .then(response => {
          //     // Handle success.
          //     console.log('Data: ', response.data);
          //     console.log('Mood envoyé avec succès');
          //   })
          //   .catch(error => {
          //     // Handle error.
          //     console.log('An error occurred:', error.response);
          //   });
        },
    },
    mounted() {
        this.$refs.prevBtn.addEventListener('click', () => {
            const totalEmojis = this.$refs.carouselContainer.children.length;
            this.currentEmojiIndex = (this.currentEmojiIndex - 1 + totalEmojis) % totalEmojis;
            this.updateCarousel();
        });

        this.$refs.nextBtn.addEventListener('click', () => {
            const totalEmojis = this.$refs.carouselContainer.children.length;
            this.currentEmojiIndex = (this.currentEmojiIndex + 1) % totalEmojis;
            this.updateCarousel();
        });
    },
    beforeMount() {
        this.dataMood();  
        this.getDate();
        // this.getCurrentMoodId();
    },
};
</script>

<template>
  <div class="flex h-screen pt-10 pb-24 flex-1 flex-col justify-between ">
    <div class="sm:mx-auto sm:max-w-sm">
        <h1 class=" text-center text-2xl font-bold tracking-tight text-black">Quel est votre mood aujourd'hui ?</h1>
    </div>

    <div class="flex items-center justify-center">
      <!-- <carousel /> -->
      <div class="flex items-center justify-center">
          <button ref="prevBtn" class="text-black font-bold rounded">
              <img alt="left_arrow" src="@/assets/left_arrow.svg" width="30" height="30" />
          </button>
          <div ref="emojiCarousel" class="overflow-hidden w-full h-full flex items-center justify-center">
            <div class="flex transition-transform ease-linear duration-500" ref="carouselContainer">
              <div v-for="item in this.mood" :key="item.attributes" class="flex flex-col flex-none w-full h-full items-center justify-center">
                <img v-if="item.attributes.Nom === 'Énervé'" :alt="item.attributes.Nom" src="@/assets/angry_emoji.svg" width="125" height="125" />
                <img v-else-if="item.attributes.Nom === 'Triste'" :alt="item.attributes.Nom" src="@/assets/sad_emoji.svg" width="125" height="125" />
                <img v-else-if="item.attributes.Nom === 'Joyeux'" :alt="item.attributes.Nom" src="@/assets/happy_emoji.svg" width="125" height="125" />
                <img v-else-if="item.attributes.Nom === 'Malade'" :alt="item.attributes.Nom" src="@/assets/seek_emoji.svg" width="125" height="125" />
                <img v-else-if="item.attributes.Nom === 'Morose'" :alt="item.attributes.Nom" src="@/assets/morose_emoji.svg" width="125" height="125" />
                <img v-else :alt="item.attributes.Nom" src="@/assets/normal_emoji.svg" width="125" height="125" />
                <!-- <img :alt="item.attributes.Nom" :src="'@/assets/'+item.attributes.Emoji.data.attributes.name" width="125" height="125" /> -->
                <p :id="item.id" class="text-center text-xl font-bold">{{item.attributes.Nom}}</p>
              </div>
            </div>
          </div>
          <button ref="nextBtn" class="text-black font-bold rounded">
            <img alt="right_arrow" src="@/assets/right_arrow.svg" width="30" height="30" />
          </button>
      </div>
    </div>

    <div>
      <button @click=postChoix class="flex w-full justify-center rounded-md bg-rose-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600">Valider</button>
    </div>
  </div>
</template>
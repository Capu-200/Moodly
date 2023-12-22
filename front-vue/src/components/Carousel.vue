<script>
import axios from 'axios';

const token = '5cb7857127429627d59e735594d07ee35651e94cd950b75289714c650af667fade52a57f7a7cde758db8a0db03d9b288428481fe66fce08a3c28e5e2161643539c974cd11862af8d66f95f54b6837ab485128f90857b114d7e21c6fee148de22cf6600131d2a66710ab753883536bcf222c4cd15682488bcca0e7c978a01ffc2';

export default {
    data() {
        return {
            currentEmojiIndex: 0,
            mood: [],
            emoji: [],
        };
    },
    methods: {
        updateCarousel() {
            const offset = -100 * this.currentEmojiIndex;
            this.$refs.carouselContainer.style.transform = `translateX(${offset}%)`;
            this.displayCurrentMood();
        },
        displayCurrentMood() {
            // Assurez-vous que le carrousel a des enfants et que l'index est valide
            if (this.$refs.carouselContainer.children.length > 0 && this.currentEmojiIndex < this.$refs.carouselContainer.children.length) {
                const currentMoodElement = this.$refs.carouselContainer.children[this.currentEmojiIndex];
                const currentMoodText = currentMoodElement.querySelector('p').textContent;
                console.log('Humeur actuelle:', currentMoodText);
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
        }
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
    },
};
</script>

<template>
    <div class="flex items-center justify-center">
        <button ref="prevBtn" class="text-black font-bold rounded">
            <img alt="left_arrow" src="@/assets/left_arrow.svg" width="30" height="30" />
        </button>
        <div ref="emojiCarousel" class="overflow-hidden w-full h-full flex items-center justify-center">
            <div class="flex transition-transform ease-linear duration-500" ref="carouselContainer">
                <div v-for="item in this.mood" :key="item.attributes" class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img :alt="item.attributes.Nom" :src="'@/assets/'+item.attributes.Emoji.data.attributes.name" width="125" height="125" />
                    <p :id="item.id" class="text-center text-xl font-bold">{{item.attributes.Nom}}</p>
                </div>

                <!-- <div class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img alt="Heureux" src="@/assets/happy_emoji.svg" width="125" height="125" />
                    <p class="text-center text-xl font-bold">Heureux</p>
                </div> -->
<!-- 
                <div class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img alt="Ok" src="@/assets/normal_emoji.svg" width="125" height="125" />
                    <p class="text-center text-xl font-bold">Ok</p>
                </div>

                <div class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img alt="Morose" src="@/assets/morose_emoji.svg" width="125" height="125" />
                    <p class="text-center text-xl font-bold">Morose</p>
                </div> -->

                <!-- <div class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img alt="Malade" src="@/assets/seek_emoji.svg" width="125" height="125" />
                    <p class="text-center text-xl font-bold">Malade</p>
                </div>

                <div class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img alt="Enervé" src="@/assets/angry_emoji.svg" width="125" height="125" />
                    <p class="text-center text-xl font-bold">Enervé</p>
                </div>

                <div class="flex flex-col flex-none w-full h-full items-center justify-center">
                    <img alt="Triste" src="@/assets/sad_emoji.svg" width="125" height="125" />
                    <p class="text-center text-xl font-bold">Triste</p>
                </div> -->
            </div>
        </div>
        <button ref="nextBtn" class="text-black font-bold rounded">
            <img alt="right_arrow" src="@/assets/right_arrow.svg" width="30" height="30" />
        </button>
    </div>
</template>

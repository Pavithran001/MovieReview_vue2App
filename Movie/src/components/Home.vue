<template>
<v-container>
    <v-row no-gutters>
        <v-col cols="12" sm="4"></v-col>
        <v-col cols="12" sm="4" class="margin-top">
            <v-text-field auto-select-first  density="comfortable" item-props menu-icon="" placeholder="Search movies" prepend-inner-icon="mdi-magnify" rounded theme="light" variant="solo" v-model="search"></v-text-field>
        </v-col>
    </v-row>
</v-container>


<v-container>
    <v-row no-gutters>
        <v-col v-for="item in filteredReviews" :key="item.id" cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
                <v-card width="280" class="card">
                    <RouterLink :to="'/details/'+item.id">
                        <v-img :width="320" :height="375" aspect-ratio="16/9" cover v-bind:src="item.mimage" class="img"></v-img><br>
                    </RouterLink>
                    <div class="center">
                        <h2 class="card-title">{{ item.mname }} ({{ item.myear }})</h2>
                        <h4 class="card-text">{{ item.mdirector }}</h4>
                        <h2>{{item.mrating}}&#9733</h2>
                        <div class="star-rating">
                        <!-- <span v-for="index in item.mrating" :key="index" class="star" :class="{ filled: index <= computedRating }">&#9733;</span> -->
                        </div>
                    </div>
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import {
computed,
    defineComponent, ref
} from 'vue';
import axios from 'axios';
const rating = ref(5);
const computedRating = computed(() => {
  return Math.min(Math.max(rating.value, 1), 5);
});
export default defineComponent({
    name: 'HomeView',
    data() {
        return {
            name: '',
            search:'',
            rating:'',
            reviews: [] as Array < any > , // Replace 'any' with the appropriate type for your reviews data
        };
    },
    async mounted() {
        try {
            const result = await axios.get("http://localhost:3002/reviews");
            this.reviews = result.data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    computed:{
        filteredReviews():Array<any>{
            let filtered = this.reviews
            if(this.search){
                filtered = this.reviews.filter((item) =>
                    item.mname.toLowerCase().includes(this.search.toLowerCase())
                )
            }
            return filtered 
        },
    }
});

</script>

<style>
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.card:hover{
    display: table;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.margin-top{
    margin-top: 20px;
}
.center {
    text-align: center;
}
.ma{
    margin-top: 100px;
}
</style>

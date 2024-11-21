<template>
<v-container>
    <v-row no-gutters>
        <v-col v-for="item in reviews" :key="item.id" cols="12" sm="4">
            <v-sheet class="ma-2 pa-2">
                <v-card width="300" class="card">
                    <RouterLink :to="'/detailsProfile/'+item.id">
                        <v-img :width="320" :height="375" aspect-ratio="16/9" cover v-bind:src="item.mimage"></v-img><br>
                    </RouterLink>
                    <div class="center">
                        <h2 class="card-title">{{ item.mname }} ({{ item.myear }})</h2>
                        <h4 class="card-text">{{ item.mdirector }}</h4>
                        <h2>{{item.mrating}}&#9733</h2>
                    </div>
                    <div class="center">
                    <RouterLink :to="'/updatePost/'+item.id" custom v-slot="{navigate}">
                        <v-btn @click="navigate" role="link" color="green" class="margin">
                            Update
                        </v-btn>
                    </RouterLink>

                    <v-btn @click="deletePost(item.id)" role="link" color="red" class="margin m1">
                        Delete
                    </v-btn>
                    </div>
                </v-card>
            </v-sheet>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { dummyMovies } from '@/data/dummyData';

export default defineComponent({
    name: 'PostView',
    data() {
        return {
            reviews: [] as Array<any>,
        };
    },
    methods: {
        deletePost(id: number) {
            this.reviews = this.reviews.filter(review => review.id !== id);
            localStorage.setItem('reviews', JSON.stringify(this.reviews));
            window.confirm("Review Deleted Successfully");
        },
        loadData() {
            const storedReviews = localStorage.getItem('reviews');
            this.reviews = storedReviews ? JSON.parse(storedReviews) : dummyMovies;
            if (!storedReviews) {
                localStorage.setItem('reviews', JSON.stringify(dummyMovies));
            }
        },
    },
    mounted() {
        this.loadData();
    },
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
.margin {
    margin-bottom: 20px;
}
.m1{
    margin-left: 3px;
}

.center {
    text-align: center;
}
</style>

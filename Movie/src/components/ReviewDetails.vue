<!-- eslint-disable vue/no-parsing-error -->
<template>
<v-container>
    <v-row no-gutters>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="4" class="margin">
            <v-img :width="320" :height="425" aspect-ratio="16/9" cover v-bind:src="review.mimage" class="card"></v-img><br>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="4">
                <v-table class="margin">
                    <tbody>
                        <tr>
                            <th>
                                <h4>Movie Name</h4>
                            </th>
                            <td>:</td>
                            <td>
                                <h4>{{ review.mname }}</h4>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <h4>Year</h4>
                            </th>
                            <td>:</td>
                            <td>
                                <h4>{{ review.myear }}</h4>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <h4>Director</h4>
                            </th>
                            <td>:</td>
                            <td>
                                <h4>{{ review.mdirector }}</h4>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <h4>Review</h4>
                            </th>
                            <td>:</td>
                            <td>
                                <h4>{{ review.mreview }}</h4>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <h4>Rating</h4>
                            </th>
                            <td>:</td>
                            <td>
                                <h4>{{ review.mrating }}&#9733</h4>
                            </td>
                        </tr><br><br>
                        <tr>
                            <router-link to="/">
                              <v-btn color="green">Back</v-btn>
                            </router-link>
                        </tr>
                    </tbody>
                    
                </v-table>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import { defineComponent } from 'vue';
import { dummyMovies } from '@/data/dummyData';

export default defineComponent({
    name: 'ViewDetails',
    data() {
        return {
            review: {
                mname: '',
                myear: '',
                mimage: '',
                mdirector: '',
                mrating: '',
                mreview: ''
            }
        };
    },
    mounted() {
        const reviews = JSON.parse(localStorage.getItem('reviews') || JSON.stringify(dummyMovies));
        const id = this.$route.params.id;
        const foundReview = reviews.find(r => r.id === Number(id));
        if (foundReview) {
            this.review = foundReview;
        }
    },
});
</script>
<style>
.margin{
    margin-top: 70px;
}
.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

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
                        <router-link to="/viewPost">
                            <v-btn color="grey">Back</v-btn>
                        </router-link>
                    </tr><br>
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
                    </tr>
                    <tr>
                        <th>
                            <RouterLink :to="'/updatePost/'+review.id" custom v-slot="{navigate}">
                                <v-btn @click="navigate" role="link" color="green" class="margin">
                                    Update
                                </v-btn>
                            </RouterLink>
                        </th>
                        <td></td>
                        <td>
                            <v-btn @click="deletePost(review.id)" role="link" color="red" class="margin">
                                Delete
                            </v-btn>
                        </td>
                    </tr>

                </tbody>
            </v-table>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import axios from 'axios';

interface Review {
    mname: string;
    myear: string;
    mimage: string;
    mdirector: string;
    mrating: string;
    mreview: string;
    id: number
}

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
            }as Review,
        };
    },

    methods: {
        async deletePost(id: number): Promise < void > {
            try {
                const result = await axios.delete(`http://localhost:3002/reviews/${id}`);
                if (result.status === 200) {
                    try {
                        const result = await axios.get('http://localhost:3002/reviews' + this.$route.params.id);
                        console.warn(result.data);
                        this.review = result.data;

                    } catch (error) {
                        console.error('Error fetching review:', error);
                    }

                }
                if (result.status == 200) {
                    this.$router.push({
                        name: "viewPost"
                    });
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        },
    },
    async mounted() {

        try {
            const result = await axios.get('http://localhost:3002/reviews/' + this.$route.params.id);
            console.warn(result.data);
            this.review = result.data;
        } catch (error) {
            console.error("Error fetching review:", error);
        }

    },
});
</script>

<style>
.margin {
    margin-top: 60px;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

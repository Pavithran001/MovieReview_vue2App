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
import axios from 'axios';
import {
    defineComponent,
    onMounted,
    ref
} from 'vue';

export default defineComponent({
    name: 'PostView',
    data() {
        return {
            reviews: [] as Array < any > ,
        };
    },
    methods: {
        async deletePost(id: number): Promise < void > {
            try {
                const result = await axios.delete(`http://localhost:3002/reviews/${id}`);
                if (result.status === 200) {
                    this.loadData();
                }
                window.confirm("Review Deleted Sucessfully")
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        },
        async loadData(): Promise < void > {
            try {
                const result = await axios.get('http://localhost:3002/reviews');
                this.reviews = result.data;
            } catch (error) {
                console.error('Error loading data:', error);
            }
        },
    },
    async mounted() {
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

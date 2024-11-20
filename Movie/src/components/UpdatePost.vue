<template>
<div class="d-flex justify-center margin">
    <v-card width="400px" class="card">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4 margin1">Update Movie Details</v-card-title>
        <v-card-text>
            <v-sheet width="300" class="mx-auto margin1">
                <v-form @submit.prevent="updatePost()">
                    <v-text-field v-model="review.mname" label="Movie Name"></v-text-field>
                    <v-text-field v-model="review.myear" label="Year"></v-text-field>
                    <v-text-field v-model="review.mimage" label="Image"></v-text-field>
                    <v-text-field v-model="review.mdirector" label="Director"></v-text-field>
                    <v-text-field v-model="review.mrating" label="Rating"></v-text-field>
                    <v-text-field v-model="review.mreview" label="Review"></v-text-field>
                    <v-btn type="submit" block class="mt-2">Update Review</v-btn><br>
                </v-form>
            </v-sheet>
        </v-card-text>
    </v-card>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Review {
  mname: string;
  myear: string;
  mimage: string;
  mdirector: string;
  mrating: string;
  mreview: string;
}

export default defineComponent({
  name: 'Postreview',
  data() {
    return {
      review: {
        mname: '',
        myear: '',
        mimage: '',
        mdirector: '',
        mrating: '',
        mreview: ''
      } as Review,
    };
  },
  methods: {
    async updatePost() {
      try {
        const result = await axios.put("http://localhost:3002/reviews/" + this.$route.params.id, {
          mname: this.review.mname,
          myear: this.review.myear,
          mimage: this.review.mimage,
          mdirector: this.review.mdirector,
          mrating: this.review.mrating,
          mreview: this.review.mreview
        });
        console.log(result);
        if (result.status === 200) {
          // localStorage.setItem("post-review", JSON.stringify(result.data));
          this.$router.push({
            name: "viewPost"
          });
          window.confirm("Reviews updated successfully")
        }
      } catch (error) {
        console.error("Error updating post:", error);
      }
    },
  },
  async mounted() {
    const user = localStorage.getItem('user-info');
    if (!user) {
      this.$router.push({ name: 'register' });
    }
    try {
      const result = await axios.get('http://localhost:3002/reviews/' + this.$route.params.id);
      console.warn(result.data);
      this.review = result.data;
    } catch (error) {
      console.error("Error fetching review data:", error);
    }
  },
});
</script>

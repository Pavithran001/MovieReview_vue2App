<template>
  <div class="d-flex justify-center margin">
    <v-card width="400px" class="card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 margin1"
        >Update Movie Details</v-card-title
      >
      <v-card-text>
        <v-sheet width="300" class="mx-auto margin1">
          <v-form @submit.prevent="updatePost()">
            <v-text-field
              v-model="review.mname"
              label="Movie Name"
            ></v-text-field>
            <v-text-field v-model="review.myear" label="Year"></v-text-field>
            <v-text-field v-model="review.mimage" label="Image"></v-text-field>
            <v-text-field
              v-model="review.mdirector"
              label="Director"
            ></v-text-field>
            <v-text-field
              v-model="review.mrating"
              label="Rating"
            ></v-text-field>
            <v-text-field
              v-model="review.mreview"
              label="Review"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2">Update Review</v-btn><br />
          </v-form>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dummyMovies } from "@/data/dummyData";

interface Review {
  mname: string;
  myear: string;
  mimage: string;
  mdirector: string;
  mrating: string;
  mreview: string;
}

export default defineComponent({
  name: "Postreview",
  data() {
    return {
      review: {
        mname: "",
        myear: "",
        mimage: "",
        mdirector: "",
        mrating: "",
        mreview: "",
      } as Review,
    };
  },
  methods: {
    async updatePost() {
      const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
      const index = reviews.findIndex(
        (r: any) => r.id === Number(this.$route.params.id)
      );

      if (index !== -1) {
        reviews[index] = { ...reviews[index], ...this.review };
        localStorage.setItem("reviews", JSON.stringify(reviews));
        window.confirm("Review updated successfully");
        this.$router.push({ name: "viewPost" });
      }
    },
  },
  mounted() {
    const reviews = JSON.parse(
      localStorage.getItem("reviews") || JSON.stringify(dummyMovies)
    );
    const id = this.$route.params.id;
    this.review = reviews.find((r: any) => r.id === Number(id)) || this.review;
  },
});
</script>

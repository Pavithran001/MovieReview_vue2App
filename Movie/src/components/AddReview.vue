<template>
  <div class="d-flex justify-center margin">
    <v-card width="400px" class="card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 margin1"
        >Movie Details</v-card-title
      >
      <v-card-text>
        <v-sheet width="300" class="mx-auto margin1">
          <v-form @submit.prevent="addReview()">
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
            <v-btn type="submit" block class="mt-2">Add Review</v-btn><br />
          </v-form>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
    addReview() {
      const newReview = {
        id: Date.now(),
        ...this.review,
      };

      const existingReviews = JSON.parse(
        localStorage.getItem("reviews") || "[]"
      );
      existingReviews.push(newReview);
      localStorage.setItem("reviews", JSON.stringify(existingReviews));

      window.confirm("Review Added Successfully");
      this.$router.push({ name: "profile" });
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "login" });
    }
  },
});
</script>
<style>
.margin {
  margin-top: 60px;
}
.margin1 {
  margin-top: 30px;
}
.text-h6 {
  text-align: center;
}
.text {
  text-align: center;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

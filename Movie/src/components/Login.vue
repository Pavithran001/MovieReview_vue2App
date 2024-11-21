<template>
  <div class="d-flex justify-center margin">
    <v-card width="400px" class="card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 margin1"
        >Login</v-card-title
      >
      <v-card-text>
        <v-sheet width="300" class="mx-auto margin1">
          <v-form @submit.prevent="login()">
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2">Login</v-btn>
            <RouterLink to="/signup">
              <h3 class="text">Sign Up</h3>
            </RouterLink>
          </v-form>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { dummyUser } from "@/data/dummyData";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default defineComponent({
  methods: {
    async login() {
      // First check dummy user
      if (
        this.email === dummyUser.email &&
        this.password === dummyUser.password
      ) {
        localStorage.setItem("user-info", JSON.stringify(dummyUser));
        window.confirm("Login Successful!");
        this.$emit("update-navbar");
        this.$router.push({ name: "home" });
        return;
      }

      // Check registered users
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: UserInfo) => u.email === this.email && u.password === this.password
      );

      if (user) {
        localStorage.setItem("user-info", JSON.stringify(user));
        window.confirm("Login Successful!");
        this.$emit("update-navbar");
        this.$router.push({ name: "home" });
      } else {
        window.confirm(
          `Invalid credentials! Use ${dummyUser.email} / ${dummyUser.password} or create a new account`
        );
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    // Redirect if already logged in
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "home" });
    }
  },
});
</script>

<style>
.margin {
  margin-top: 100px;
}

.margin1 {
  margin-top: 30px;
}

.text-h6 {
  text-align: center;
}

.text {
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

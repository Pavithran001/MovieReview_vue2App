<template>
  <div class="d-flex justify-center margin">
    <v-card width="400px" class="card">
      <v-card-title class="text-h6 text-md-h5 text-lg-h4 margin1"
        >Sign Up</v-card-title
      >
      <v-card-text>
        <v-sheet width="300" class="mx-auto margin1">
          <v-form @submit.prevent="signUp()">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="Name"
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="Email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              type="password"
            ></v-text-field>
            <v-btn type="submit" block class="mt-2">Sign Up</v-btn><br />
            <RouterLink to="/login">
              <h3 class="text">Already have an account? Login</h3>
            </RouterLink>
          </v-form>
        </v-sheet>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default defineComponent({
  data() {
    return {
      email: "",
      name: "",
      password: "",
      emailRules: [
        (value: string) => {
          if (value) return true;
          return "E-mail is required.";
        },
        (value: string) => {
          if (/.+@.+\..+/.test(value)) return true;
          return "E-mail must be valid.";
        },
      ],
      nameRules: [
        (value: string) => {
          if (value) return true;
          return "Name is required.";
        },
        (value: string) => {
          if (value?.length <= 30) return true;
          return "Name must be less than 30 characters.";
        },
      ],
      passwordRules: [
        (value: string) => {
          if (value) return true;
          return "Password is required.";
        },
        (value: string) => {
          if (value?.length >= 6) return true;
          return "Password must be at least 6 characters.";
        },
      ],
    };
  },
  methods: {
    async signUp() {
      // Create new user object
      const newUser: UserInfo = {
        id: Date.now(),
        name: this.name,
        email: this.email,
        password: this.password,
      };

      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      // Check if email already exists
      const emailExists = existingUsers.some(
        (user: UserInfo) => user.email === this.email
      );
      if (emailExists) {
        window.confirm(
          "Email already registered. Please use a different email."
        );
        return;
      }

      // Add new user to array
      existingUsers.push(newUser);

      // Save updated users array
      localStorage.setItem("users", JSON.stringify(existingUsers));

      // Save current user info
      localStorage.setItem("user-info", JSON.stringify(newUser));

      window.confirm("Sign up successful!");
      this.$emit("update-navbar");
      this.$router.push({ name: "home" });
    },
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

<style scoped>
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
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

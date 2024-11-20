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
import axios from "axios";

export default defineComponent({
  methods: {
    async login() {
      try {
        const result = await axios.get(
          `http://localhost:3002/user?email=${this.email}&password=${this.password}`
        );

        if (result.status === 200) {
          localStorage.setItem("user-info", JSON.stringify(result.data[0]));
          this.$router.push({
            name: "home",
          });
          this.$emit("updateNavbar");
        }
        // window.confirm("Loggedin Successfull")
        // const loggedin = result.data.find((user: { email: string; password: string; }) => user.email === email && user.password === this.password)
        // if(loggedin){
        //     window.confirm("Loggedin Successfull")
        //     this.$router.push({
        //         name: "home"
        //     });
        // }else{
        //     window.confirm("Enter valid email and password")
        //     this.$router.push({
        //         name: "login"
        //     });
        // }

        console.log(this.email, this.password);
      } catch (error) {
        console.error("Error logging in:", error);
        // window.confirm("Enter correct email and password")
      }
    },
  },
  data() {
    return {
      email: "",
      password: "",
    };
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

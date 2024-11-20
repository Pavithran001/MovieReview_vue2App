<template>
<div class="d-flex justify-center margin">
    <v-card width="400px" class="card">
        <v-card-title class="text-h6 text-md-h5 text-lg-h4 margin1">Sign Up</v-card-title>
        <v-card-text>
            <v-sheet width="300" class="mx-auto margin1">
                <v-form @submit.prevent="signUp()">
                    <v-text-field v-model="name" :rules="nameRules" label="Name"></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="Email"></v-text-field>
                    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                    <v-btn type="submit" block class="mt-2">Sign Up</v-btn><br>
                    <RouterLink to="/login">
                        <h3 class="text">Login</h3>
                    </RouterLink>
                </v-form>
            </v-sheet>
        </v-card-text>
    </v-card>
</div>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import axios from 'axios';

export default defineComponent({
    data() {
        return {
            email: '',
            name: '',
            password: '',
            action: false,
            emailRules: [
                (value: any) => {
                    if (value) return true

                    return 'E-mail is requred.'
                },
                (value: string) => {
                    if (/.+@.+\..+/.test(value)) return true

                    return 'E-mail must be valid.'
                },
            ],
            nameRules: [
                (value: any) => {
                    if (value) return true

                    return 'Name is required.'
                },
                (value: string | any[]) => {
                    if (value ?.length <= 30) return true

                    return 'Name must be less than 30 characters.'
                },
            ],
        };
    },
    methods: {
        async signUp() {
            try {
                const result = await axios.post("http://localhost:3002/user", {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                });

                console.log(result);
                if (result.status === 201) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push({
                        name: "login"
                    });
                    this.action = true;
                }
            } catch (error) {
                console.error("Error signing up:", error);
            }
        },
    },
    mounted() {
        const user = localStorage.getItem('user-info');
        if (user) {
            this.$router.push({
                name: 'login'
            });
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
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

<template>
<v-container>
    <v-row no-gutters>
        <v-col cols="12" sm="2"></v-col>
        <v-col cols="12" sm="8" class="margin">
            <v-card width="650px" class="card">
                <v-card-text>
                    <v-sheet :width="590" :height="220" class="mx-auto margin1">
                        <v-row no-gutters>
                            <v-col cols="12" sm="4">
                                <v-img :width="150" :height="150" aspect-ratio="16/9" cover src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"></v-img><br>
                            </v-col>
                            <v-col cols="12" sm="1"></v-col>
                            <v-col cols="12" sm="7">
                            <v-table>
                                <tbody>
                                    <tr>
                                        <th>
                                            <h3 class="center">User Name</h3>
                                        </th>
                                        <td>
                                            <h3 class="center">Email</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <h3 class="center" style="color: rgb(134, 134, 134);">{{ name }}</h3>
                                        </th>
                                        <td>
                                            <h3 class="center" style="color: rgb(134, 134, 134);">{{ email }}</h3>
                                        </td>
                                    </tr><br>
                                    <tr>
                                        <th class="margin">
                                            <RouterLink to="/addReview" custom v-slot="{navigate}">
                                                <v-btn @click="navigate" role="link" color="light-blue" class="center">
                                                    Add Review
                                                </v-btn>
                                            </RouterLink>
                                        </th>
                                        <td class="margin">
                                            <RouterLink to="/viewPost" custom v-slot="{navigate}">
                                                <v-btn @click="navigate" role="link" color="light-blue" class="center">
                                                    View Review
                                                </v-btn>
                                            </RouterLink>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-table>
                            </v-col>
                            </v-row>
                    </v-sheet>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script lang="ts">
import {
    defineComponent
} from 'vue';
import axios from 'axios';

interface UserInfo {
    name: string;
    email: string;
    id: number;
}

export default defineComponent({
    name: 'ProfileView',
    data() {
        return {
            name: '',
            email: '',
            id: 0,
            user: [] as UserInfo[],
        };
    },
    async mounted() {
        const user = localStorage.getItem('user-info');
        this.name = JSON.parse(user).name;
        this.email = JSON.parse(user).email;
        this.id = JSON.parse(user).id;

        try {
            const result = await axios.get("http://localhost:3002/user");
            this.user = result.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    },
});
</script>

<style>
.center {
    text-align: center;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>

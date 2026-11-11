<template>
  <v-app>
    <v-app-bar color="primary" flat>
      <v-app-bar-title class="font-weight-bold">System Integration Project Dashboard</v-app-bar-title>
      <template v-slot:append>
        <v-btn variant="text" prepend-icon="mdi-logout" @click="logout">Logout</v-btn>
      </template>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8">
        <!-- User Profile Card -->
        <v-card class="pa-6 mb-6 elevation-2 rounded-lg" v-if="user">
          <v-row align="center">
            <v-col cols="auto">
              <v-avatar size="64" class="elevation-1">
                <v-img :src="user.picture" alt="Profile"></v-img>
              </v-avatar>
            </v-col>
            <v-col>
              <h2 class="text-h5 font-weight-bold">Handsontable {{ user.name }}!</h2>
              <p class="text-body-2 text-grey-darken-1 mb-0">Email: <strong>{{ user.email }}</strong></p>
              <v-chip color="success" size="small" class="mt-2">Google Authenticated Active Session</v-chip>
            </v-col>
          </v-row>
        </v-card>

        <!-- 3rd Party Library Feature (Handsontable) -->
        <EditableSpreadsheet />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const router = useRouter()
const user = ref(null)

// Ilapat ang auth middleware
definePageMeta({
  middleware: ['auth']
})

onMounted(() => {
  const storedUser = localStorage.getItem('google_user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
  }
})

const logout = () => {
  localStorage.removeItem('google_user')
  router.push('/login')
}
</script>
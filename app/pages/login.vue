<template>
  <v-container class="fill-height d-flex justify-center align-center" style="min-height: 100vh;">
    <v-card class="pa-8 elevation-4 rounded-xl text-center" max-width="420" width="100%">
      <v-avatar color="primary" size="64" class="mb-4">
        <v-icon icon="mdi-google" size="32" color="white"></v-icon>
      </v-avatar>
      
      <h2 class="text-h5 font-weight-bold mb-2">System Integration Exam</h2>
      <p class="text-body-2 text-grey-darken-1 mb-6">Mag-sign in gamit ang iyong Google Account para mabuksan ang Dashboard.</p>

      <!-- Google Sign-In Button Container -->
      <div id="googleButtonDiv" class="d-flex justify-center mb-4"></div>

      <v-alert v-if="errorMessage" type="error" density="compact" class="mt-4">{{ errorMessage }}</v-alert>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const router = useRouter()
const config = useRuntimeConfig()
const errorMessage = ref('')

const handleCredentialResponse = (response) => {
  try {
    // I-decode ang JWT ID token mula kay Google para makuha ang pangalan at email
    const base64Url = response.credential.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
    const profile = JSON.parse(jsonPayload)

    // I-save ang user info sa localStorage para sa app state
    localStorage.setItem('google_user', JSON.stringify({
      name: profile.name,
      email: profile.email,
      picture: profile.picture
    }))

    // Redirect papuntang Dashboard
    router.push('/')
  } catch (err) {
    errorMessage.value = 'Nabigo ang pag-parse ng Google profile.'
  }
}

onMounted(() => {
  // Load Google GIS script dynamically
  if (!document.getElementById('google-jssdk')) {
    const script = document.createElement('script')
    script.id = 'google-jssdk'
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.onload = () => initGoogleSignIn()
    document.head.appendChild(script)
  } else {
    initGoogleSignIn()
  }
})

const initGoogleSignIn = () => {
  if (window.google) {
    window.google.accounts.id.initialize({
      client_id: config.public.googleClientId,
      callback: handleCredentialResponse
    })
    window.google.accounts.id.renderButton(
      document.getElementById('googleButtonDiv'),
      { theme: 'outline', size: 'large', width: '320' }
    )
  }
}
</script>
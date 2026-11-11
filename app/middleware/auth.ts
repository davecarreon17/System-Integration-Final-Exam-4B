export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const user = localStorage.getItem('google_user')

    if (to.path === '/login' && user) {
      return navigateTo('/')
    }

    if (to.path !== '/login' && !user) {
      return navigateTo('/login')
    }
  }
})
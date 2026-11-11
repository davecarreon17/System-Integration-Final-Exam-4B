<template>
  <v-app>
    <!-- Isang malinis na App Bar sa itaas na may Logout button -->
    

    <v-main class="bg-grey-lighten-4">
      <v-container class="py-8">
        <!-- Direktang Interactive Data Grid Card (Tinanggal na ang dobleng header sa gitna) -->
        <v-card class="pa-6 elevation-3 rounded-xl">
          <div class="d-flex justify-space-between align-center mb-4">
            <div>
              <h2 class="text-h5 font-weight-bold text-grey-darken-3">Interactive Data Grid</h2>
              <p class="text-body-2 text-grey">I-edit ang mga cells sa ibaba para subukan ang Handsontable library feature.</p>
            </div>
            <v-btn color="success" prepend-icon="mdi-content-save" @click="saveData">
              I-save ang Data
            </v-btn>
          </div>

          <!-- Alert/Feedback message -->
          <v-alert v-if="feedbackMessage" :type="feedbackType" density="compact" class="mb-4" closable>
            {{ feedbackMessage }}
          </v-alert>

          <!-- Handsontable Component Wrapper -->
          <div class="border rounded-lg overflow-hidden elevation-1">
            <client-only>
              <hot-table :settings="hotSettings" ref="hotRef"></hot-table>
            </client-only>
          </div>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { HotTable } from '@handsontable/vue3'
import { registerAllCellTypes } from 'handsontable/registry'
import 'handsontable/styles/handsontable.min.css'

registerAllCellTypes()

const router = useRouter()
const hotRef = ref(null)
const feedbackMessage = ref('')
const feedbackType = ref('success')

const hotSettings = ref({
  data: [
    ['Siling Labuyo', 150, 45.00],
    ['Tomato', 200, 30.00],
    ['Eggplant', 120, 25.00]
  ],
  colHeaders: ['Pangalan ng Pananim', 'Dami (Kilo)', 'Presyo bawat Kilo (PHP)'],
  columns: [
    { type: 'text' },
    { type: 'numeric' },
    { type: 'numeric', numericFormat: { pattern: '0,0.00' } }
  ],
  rowHeaders: true,
  height: '380px',
  licenseKey: 'non-commercial-and-evaluation'
})

const saveData = () => {
  try {
    const currentData = hotRef.value.hotInstance.getData()
    feedbackType.value = 'success'
    feedbackMessage.value = 'Matagumpay na nai-save at na-proseso ang spreadsheet data!'
  } catch (error) {
    feedbackType.value = 'error'
    feedbackMessage.value = 'May naganap na error habang sine-save ang data.'
  }
}

const logout = () => {
  localStorage.removeItem('google_user')
  router.push('/login')
}
</script>
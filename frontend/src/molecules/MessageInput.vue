<template>
    <form @submit.prevent="handleSubmit" class="flex items-center">
      <div class="flex-1 relative mx-2">
        <input
          type="text"
          v-model="message"
          placeholder="Send a message..."
          class="w-full py-3 px-4 bg-teal-50/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-300 transition-all placeholder-teal-400"
        />
      </div>
      <button
        type="submit"
        :disabled="!message.trim()"
        :class="`p-3 rounded-xl transition-all transform hover:scale-105 active:scale-95
          ${message.trim() ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md hover:shadow-lg' : 'bg-teal-50/50 text-teal-300'}`"
      >
        <i class="bx bx-send text-xl"></i>
      </button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    // No props required directly, but we need to define emits
  })
  
  const emit = defineEmits(['sendMessage'])
  const message = ref('')
  
  const handleSubmit = () => {
    if (message.value.trim()) {
      emit('sendMessage', message.value)
      message.value = ''
    }
  }
  </script>
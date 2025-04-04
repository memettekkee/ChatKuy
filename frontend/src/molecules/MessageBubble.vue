<template>
    <div :class="`flex ${isMe ? 'justify-end' : 'justify-start'}`">
      <div
        :class="`max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm
          ${isMe ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-lg transform hover:scale-[1.02] transition-transform' : 'bg-white text-gray-800 rounded-bl-lg transform hover:scale-[1.02] transition-transform'}`"
      >
        <span 
          v-if="!isMe && message.author" 
          class="text-xs font-medium text-teal-600 block mb-1"
        >
          {{ message.author }}
        </span>
        
        <p class="text-sm">{{ message.text }}</p>
        
        <div
          :class="`flex items-center text-xs mt-1 ${isMe ? 'text-teal-100 justify-end' : 'text-gray-500'}`"
        >
          <span>{{ message.time }}</span>
          <i v-if="isMe" class="bx bx-check-double ml-1" style="font-size: 14px;"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    message: {
      type: Object,
      required: true
    }
  })
  
  const isMe = computed(() => props.message.sender === 'me')
  </script>
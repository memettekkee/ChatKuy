<template>
    <div class="p-4 space-y-4">
      <!-- Messages -->
      <MessageBubble 
        v-for="message in messages" 
        :key="message.id" 
        :message="message"
        v-animateonscroll="{ 
          enterClass: `animate-enter slide-in-from-d-v2-8 animate-duration-500`,
        }" 
      />
      
      <div ref="messagesEndRef"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import MessageBubble from '../molecules/MessageBubble.vue'
  
  // Define props
  const props = defineProps({
    messages: {
      type: Array,
      required: true
    }
  })
  
  // Reference to the end of messages for auto-scrolling
  const messagesEndRef = ref(null)
  
  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.value?.scrollIntoView({
      behavior: 'smooth'
    })
  }
  
  // Watch for changes in messages array
  watch(() => props.messages, () => {
    // Use nextTick to ensure DOM is updated before scrolling
    setTimeout(() => {
      scrollToBottom()
    }, 100)
  }, { deep: true })
  
  // Initial scroll when component is mounted
  onMounted(() => {
    scrollToBottom()
  })
  </script>
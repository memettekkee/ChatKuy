<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="h-16 flex items-center justify-between px-6">
      <div class="flex items-center">
        <i class="bx bx-user-circle w-6 h-6 text-teal-600 text-xl"></i>
        <h1 class="ml-3 text-xl font-bold bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent">
          ChatKuy
        </h1>
      </div>
    </div>
    
    <!-- Contact List -->
    <div class="flex-1 overflow-y-auto py-4">
      <div
        v-for="chat in chats"
        :key="chat.id"
        :class="`group flex items-center px-4 py-3 mx-2 cursor-pointer transition-all rounded-2xl
          ${currentChatId === chat.id ? 'bg-gradient-to-r from-teal-500/10 to-emerald-500/10' : 'hover:bg-gradient-to-r hover:from-teal-500/5 hover:to-emerald-500/5'}`"
        @click="$emit('setCurrent', chat)"
      >
        <div class="relative">
          <img
            :src="chat.avatar"
            :alt="chat.name"
            class="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-100 group-hover:ring-teal-200 transition-all"
          />
          <div 
            v-if="chat.isGroup" 
            class="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-lg flex items-center justify-center ring-2 ring-white"
          >
            <span class="text-[10px] font-medium text-white">
              {{ chat.members.length || chat.members }}
            </span>
          </div>
          <div 
            v-if="!chat.isGroup && chat.online" 
            class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-lg ring-2 ring-white"
          ></div>
        </div>
        <div class="ml-3 flex-1 min-w-0">
          <div class="flex justify-between items-baseline">
            <h3 class="font-medium text-gray-800 truncate">
              {{ chat.name }}
            </h3>
            <span class="text-xs text-gray-500 ml-2 flex-shrink-0">
              {{ chat.time }}
            </span>
          </div>
          <p class="text-sm text-gray-500 truncate">
            {{ chat.lastMessage }}
          </p>
        </div>
        <div 
          v-if="chat.unread > 0"
          class="ml-2 w-5 h-5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center"
        >
          <span class="text-xs text-white font-medium">
            {{ chat.unread }}
          </span>
        </div>
      </div>
    </div>
    
    <!-- New Chat Button -->
    <div class="fixed bottom-6 right-6">
      <button class="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:rotate-12">
        <i class="bx bx-plus text-2xl"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  currentChatId: {
    type: Number,
    required: true
  },
  chats: {
    type: Array,
    required: true
  }
})

// Define emits
const emit = defineEmits(['setCurrent'])
</script>
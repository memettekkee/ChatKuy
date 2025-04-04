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
          v-for="contact in contacts"
          :key="contact.id"
          :class="`group flex items-center px-4 py-3 mx-2 cursor-pointer transition-all rounded-2xl
            ${currentChatId === contact.id ? 'bg-gradient-to-r from-teal-500/10 to-emerald-500/10' : 'hover:bg-gradient-to-r hover:from-teal-500/5 hover:to-emerald-500/5'}`"
          @click="$emit('setCurrent', contact)"
        >
          <div class="relative">
            <img
              :src="contact.avatar"
              :alt="contact.name"
              class="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-100 group-hover:ring-teal-200 transition-all"
            />
            <div 
              v-if="contact.isGroup" 
              class="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-lg flex items-center justify-center ring-2 ring-white"
            >
              <span class="text-[10px] font-medium text-white">
                {{ contact.members }}
              </span>
            </div>
            <div 
              v-if="!contact.isGroup && contact.online" 
              class="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-lg ring-2 ring-white"
            ></div>
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <h3 class="font-medium text-gray-800 truncate">
                {{ contact.name }}
              </h3>
              <span class="text-xs text-gray-500 ml-2 flex-shrink-0">
                {{ contact.time }}
              </span>
            </div>
            <p class="text-sm text-gray-500 truncate">
              {{ contact.lastMessage }}
            </p>
          </div>
          <div 
            v-if="contact.unread > 0"
            class="ml-2 w-5 h-5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center"
          >
            <span class="text-xs text-white font-medium">
              {{ contact.unread }}
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
    }
  })
  
  // Define emits
  const emit = defineEmits(['setCurrent'])
  
  // Contact data
  const contacts = [
    {
      id: 1,
      name: 'Beach Cleanup Squad 🌊',
      avatar:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      lastMessage: 'Bringing extra bags and gloves for everyone! 🧤',
      time: '10:12 AM',
      unread: 2,
      online: true,
      isGroup: true,
      members: 5,
    },
    {
      id: 2,
      name: 'Eco Warriors 🌱',
      avatar:
        'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      lastMessage: 'Next tree planting session this Sunday!',
      time: '9:45 AM',
      unread: 3,
      online: true,
      isGroup: true,
      members: 12,
    },
    {
      id: 3,
      name: 'Sarah',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      lastMessage: 'See you at the event! 🎉',
      time: 'Yesterday',
      unread: 0,
      online: true,
    },
    {
      id: 4,
      name: 'Ocean Friends 🐋',
      avatar:
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      lastMessage: "Great job everyone at today's cleanup!",
      time: 'Yesterday',
      unread: 5,
      online: false,
      isGroup: true,
      members: 8,
    },
  ]
  </script>
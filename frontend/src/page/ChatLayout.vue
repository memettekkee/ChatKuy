<template>
    <div class="flex h-screen overflow-hidden">
      <!-- Sidebar -->
      <div class="w-80 bg-white/80 backdrop-blur-md">
        <Sidebar
          :currentChatId="currentChat.id"
          @setCurrent="setCurrentChat"
        />
      </div>
      
      <!-- Chat Area -->
      <div class="flex-1 flex flex-col">
        <!-- Chat Header -->
        <div class="h-16 bg-white/80 backdrop-blur-md border-b border-teal-100 flex items-center px-6">
          <div
            class="flex items-center cursor-pointer"
            @click="showUserDetail = true"
          >
            <div class="relative">
              <img
                :src="currentChat.avatar"
                :alt="currentChat.name"
                class="w-10 h-10 rounded-2xl object-cover ring-2 ring-teal-300"
              />
              <div 
                v-if="currentChat.isGroup" 
                class="absolute -bottom-1 -right-1 w-5 h-5 bg-teal-400 rounded-lg flex items-center justify-center ring-2 ring-white"
              >
                <span class="text-[10px] font-medium text-white">5</span>
              </div>
            </div>
            <div class="ml-3">
              <h3 class="font-semibold text-gray-800">
                {{ currentChat.name }}
              </h3>
              <p class="text-xs text-teal-600">{{ currentChat.lastSeen }}</p>
            </div>
          </div>
        </div>
        
        <!-- Messages -->
        <div class="flex-1 overflow-y-auto bg-gradient-to-br from-teal-50/50 via-emerald-50/50 to-cyan-50/50">
          <ChatWindow :messages="messages" />
        </div>
        
        <!-- Input Area -->
        <div class="bg-white/80 backdrop-blur-md p-4">
          <MessageInput @sendMessage="handleSendMessage" />
        </div>
      </div>
      
      <!-- User Detail Sidebar -->
      <UserDetail
        v-if="showUserDetail"
        :user="currentChat"
        @close="showUserDetail = false"
      />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Sidebar from '../components/Sidebar.vue'
  import ChatWindow from '../components/ChatWindow.vue'
  import MessageInput from '../molecules/MessageInput.vue'
  import UserDetail from '../components/UserDetail.vue'
  
  const currentChat = ref({
    id: 1,
    name: 'Beach Cleanup Squad 🌊',
    avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    online: true,
    lastSeen: '5 online',
    isGroup: true,
    members: ['Sarah', 'Alex', 'Jessica', '+3 more'],
  })
  
  const showUserDetail = ref(false)
  
  const messages = ref([
    {
      id: 1,
      text: "Who's joining the beach cleanup this weekend? 🏖️",
      sender: 'them',
      author: 'Sarah',
      time: '10:03 AM',
    },
    {
      id: 2,
      text: "Count me in! I'll bring some snacks 🍪",
      sender: 'me',
      time: '10:05 AM',
    },
    {
      id: 3,
      text: 'Perfect weather for it! I can help with transportation 🚗',
      sender: 'them',
      author: 'Alex',
      time: '10:06 AM',
    },
    {
      id: 4,
      text: "Awesome! Let's meet at the usual spot?",
      sender: 'me',
      time: '10:10 AM',
    },
    {
      id: 5,
      text: 'Bringing extra bags and gloves for everyone! 🧤',
      sender: 'them',
      author: 'Jessica',
      time: '10:12 AM',
    },
  ])
  
  const setCurrentChat = (chat) => {
    currentChat.value = chat
  }
  
  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.value.length + 1,
      text,
      sender: 'me',
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    messages.value.push(newMessage)
  }
  </script>
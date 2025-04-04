<template>
    <div class="w-80 bg-white/80 backdrop-blur-md border-l border-teal-100 flex flex-col h-full">
      <!-- Header -->
      <div class="h-16 flex items-center justify-between px-6 border-b border-teal-100">
        <h2 class="font-semibold text-gray-800">Contact info</h2>
        <button
          @click="$emit('close')"
          class="p-2 rounded-xl hover:bg-teal-50 text-gray-600 transition-colors"
        >
          <i class="bx bx-x text-xl"></i>
        </button>
      </div>
      
      <!-- Profile Section -->
      <div class="flex flex-col items-center pt-8 pb-6 border-b border-teal-100">
        <div class="relative w-32 h-32">
          <img
            :src="user.avatar"
            :alt="user.name"
            class="w-full h-full rounded-3xl object-cover ring-4 ring-teal-100"
          />
          <div 
            v-if="user.isGroup" 
            class="absolute -bottom-2 -right-2 px-3 py-1 bg-teal-400 rounded-xl"
          >
            <span class="text-sm text-white font-medium">
              {{ user.members?.length || 0 }} members
            </span>
          </div>
        </div>
        <h1 class="mt-4 text-xl font-semibold text-gray-800">
          {{ user.name }}
        </h1>
        <p class="text-sm text-teal-600 mt-1">{{ user.lastSeen }}</p>
      </div>
      
      <!-- Media Section -->
      <div class="flex-1 overflow-y-auto">
        <div class="p-6 border-b border-teal-100">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center text-gray-800">
              <i class="bx bx-image text-teal-500 text-xl"></i>
              <span class="ml-3 font-medium">Media, links and docs</span>
            </div>
            <div class="flex items-center text-teal-500">
              <span class="text-sm font-medium mr-1">0</span>
              <i class="bx bx-chevron-right text-xl"></i>
            </div>
          </div>
          <div class="bg-teal-50/50 rounded-xl p-4 flex items-center justify-center">
            <p class="text-sm text-gray-500">No media shared yet</p>
          </div>
        </div>
        
        <!-- Settings -->
        <div class="p-6 space-y-6">
          <!-- Starred Messages -->
          <button class="w-full flex items-center justify-between text-gray-800 hover:bg-teal-50/50 p-3 rounded-xl transition-colors">
            <div class="flex items-center">
              <i class="bx bx-star text-teal-500 text-xl"></i>
              <span class="ml-3 font-medium">Starred messages</span>
            </div>
            <i class="bx bx-chevron-right text-teal-500 text-xl"></i>
          </button>
          
          <!-- Mute Notifications -->
          <div class="flex items-center justify-between p-3">
            <div class="flex items-center text-gray-800">
              <i class="bx bx-bell text-teal-500 text-xl"></i>
              <span class="ml-3 font-medium">Mute notifications</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>
          
          <!-- Disappearing Messages -->
          <button class="w-full flex items-center justify-between text-gray-800 hover:bg-teal-50/50 p-3 rounded-xl transition-colors">
            <div class="flex items-center">
              <i class="bx bx-time text-teal-500 text-xl"></i>
              <div class="ml-3">
                <span class="font-medium">Disappearing messages</span>
                <p class="text-sm text-gray-500">Off</p>
              </div>
            </div>
            <i class="bx bx-chevron-right text-teal-500 text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // Define props
  const props = defineProps({
    user: {
      type: Object,
      required: true
    }
  })
  
  // Define emits
  const emit = defineEmits(['close'])
  </script>
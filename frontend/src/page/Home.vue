<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import { motion } from 'motion-v'
</script>

<template>
  <main class="h-screen w-full">
    <Navbar/>
    <section class="w-full px-6 md:px-16 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
      <div class="w-full md:w-1/2 mb-10 md:mb-0">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span class="text-primary">Connect</span> with Friends in a 
          <span class="text-primary">Fun</span> New Way
        </h1>
        <p class="text-lg md:text-xl mb-8 text-gray-700">
          ChatKuy brings friends together through playful, location-based messaging. Share moments, track adventures, and stay connected with the people who matter most.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button class="bg-primary text-white px-8 py-3 rounded-full hover:bg-hover transition-colors flex items-center justify-center">
            Start Chatting Now
            <ArrowRight class="ml-2" size={18} />
          </button>
          <button class="bg-white border-2 border-primary text-primary px-8 py-3 rounded-full hover:bg-secondary transition-colors">
            Discover Features
          </button>
        </div>
      </div>
      <motion.div
      :animate="{ x: 100, rotate: 180, scale: 1.2 }"
      :transition="{ duration: 2 }" 
      class="px-16">
        <img class="h-96 rounded-2xl shadow-2xl shadow-gray-300" src="/public/image/chat-preview.png"/>
      </motion.div>
    </section>
    <div class="h-[1000px]">

    </div>
  </main>
</template>


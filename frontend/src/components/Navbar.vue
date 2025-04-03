<!-- <script setup lang="ts">

</script> -->

<template>
    <header class="w-full py-4 px-6 md:px-16 flex justify-between items-center sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div class="flex">
            <img class="h-12" src="/public/image/main-logo.png"/>
            <img class="h-6" src="/public/image/second-logo.png"/>
        </div>
        <nav class="hidden md:flex items-center space-x-8">
            <a
            href="#features"
            class="text-gray-700 hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#communities"
            class="text-gray-700 hover:text-primary transition-colors"
          >
            Communities
          </a>
          <a
            href="#how-it-works"
            class="text-gray-700 hover:text-primary transition-colors"
          >
            How It Works
          </a>
          <button @click="$router.push('/login')"  class="bg-white border-2 border-primary text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
            Log In
          </button>
          <button @click="$router.push('/register')"  class="bg-primary text-white px-6 py-2 rounded-full hover:bg-hover transition-colors">
            Sign Up Free
          </button>
        </nav>
        
        <!-- Mobile  -->
         <button class="md:hidden" @click="isMenuOpen = !isMenuOpen">
            <i class="bx bx-x text-xl" v-if="isMenuOpen"/>
            <i class="bx bx-menu text-xl" v-else/>
         </button>
         <div v-if="isMenuOpen" class="absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 md:hidden">
            <nav class="flex flex-col space-y-4">
              <a
                href="#features"
                class="text-gray-700 hover:text-primary transition-colors"
              >
                Features
              </a>
              <a
                href="#communities"
                class="text-gray-700 hover:text-primary transition-colors"
              >
                Communities
              </a>
              <a
                href="#how-it-works"
                class="text-gray-700 hover:text-primary transition-colors"
              >
                How It Works
              </a>
              <button @click="$router.push('/login')" class="bg-white border-2 border-primary text-primary px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors">
                Log In
              </button>
              <button @click="$router.push('/register')" class="bg-primary text-white px-6 py-2 rounded-full hover:bg-[#0AB391] transition-colors">
                Sign Up Free
              </button>
            </nav>
          </div>
    </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isMenuOpen = ref(false)

</script>
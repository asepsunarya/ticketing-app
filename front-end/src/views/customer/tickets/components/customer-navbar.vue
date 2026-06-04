<template>
  <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            aria-controls="customer-navbar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          <div @click="toHome" class="cursor-pointer flex ms-2 md:me-24">
            <img src="@/assets/logo.svg" class="h-8 me-3" alt="BoostTicket Logo" />
            <span
              class="lg:block hidden self-center text-xl font-semibold sm:text-2xl whitespace-nowrap"
            >
              BoostTicket
            </span>
          </div>

          <div class="hidden w-full md:flex items-center" id="customer-navbar">
            <ul
              class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white"
            >
              <li>
                <button
                  @click="toHome"
                  :class="{ 'text-primary': isCustomerTicketRoute }"
                  class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto"
                >
                  Tiket
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <button
              type="button"
              class="flex items-center gap-2 text-sm text-gray-900 rounded-lg px-3 py-2 hover:bg-gray-100 focus:ring-4 focus:ring-gray-300"
              aria-expanded="false"
              data-dropdown-toggle="dropdown-customer-user"
            >
              <span class="font-medium max-w-[160px] truncate">
                {{ authStore.user?.name || 'Customer' }}
              </span>
              <svg
                class="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
              id="dropdown-customer-user"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900" role="none">
                  {{ authStore.user?.name }}
                </p>
                <p class="text-sm font-medium text-gray-900 truncate" role="none">
                  {{ authStore.user?.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    @click="signOut"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const isCustomerTicketRoute = computed(() => route.path.startsWith('/customer/tickets'));

function toHome() {
  router.push('/customer/tickets');
}

function signOut() {
  localStorage.removeItem('auth');
  location.href = '/login';
}
</script>

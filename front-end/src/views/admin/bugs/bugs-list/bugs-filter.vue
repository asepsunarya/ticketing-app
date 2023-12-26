<template>
  <div
    class="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white"
  >
    <div>
      <button
        id="dropdownActionButton"
        data-dropdown-toggle="dropdownAction"
        class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5"
        type="button"
      >
        <span class="sr-only">Action button</span>
        Action
        <svg
          class="w-2.5 h-2.5 ms-2.5"
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
      <!-- Dropdown menu -->
      <div
        id="dropdownAction"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
      >
        <ul
          class="py-1 text-sm text-gray-700"
          aria-labelledby="dropdownActionButton"
        >
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Reward</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Promote</a>
          </li>
          <li>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100"
              >Activate account</a
            >
          </li>
        </ul>
        <div class="py-1">
          <a
            href="#"
            class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >Delete User</a
          >
        </div>
      </div>
    </div>
    <bugs-search />
  </div>
</template>

<script setup lang="ts">
import bugsSearch from "@/views/admin/bugs/bugs-list/bugs-search.vue";
</script>

<template>
  <nav
    class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start rtl:justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span class="sr-only">Open sidebar</span>
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
              ></path>
            </svg>
          </button>
          <div @click="toHome" class="cursor-pointer flex ms-2 md:me-24">
            <img src="@/assets/logo.svg" class="h-8 me-3" alt="FlowBite Logo" />
            <span
              class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
              >BoostTicket</span
            >
          </div>

          <div class="hidden w-full md:flex items-center" id="navbar-dropdown">
            <ul
              class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              <li class="!text-blue">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar2"
                  class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 !text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Kerjaanmu
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
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Proyek
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
                <div
                  id="dropdownNavbar"
                  class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div class="pt-2">
                    <div class="py-2 px-4 text-sm font-bold">Terbaru</div>
                    <div class="text-sm text-gray-700 dark:text-gray-400">
                      <div
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        <img
                          src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
                          class="w-8 h-8 rounded"
                        />
                        <div class="flex flex-col px-4">
                          <a
                            href="#"
                            class="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >Manypage.id</a
                          >
                          <span class="text-zinc-400 text-xs"
                            >Kelola Posting</span
                          >
                        </div>
                      </div>
                      <div
                        class="flex items-center px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        <img
                          src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
                          class="w-8 h-8 rounded"
                        />
                        <div class="flex flex-col px-4 py-2">
                          <a
                            href="#"
                            class="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >Manychat.id</a
                          >
                          <span class="text-zinc-400 text-xs">Kelola Chat</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Lihat Semua</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Buat Aplikasi</a
                    >
                  </div>
                </div>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownTeam"
                  class="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  Tim
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
                <div
                  id="dropdownTeam"
                  class="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-64 dark:bg-gray-700 dark:divide-gray-600"
                >
                  <div class="pt-2">
                    <div class="py-2 px-4 text-sm font-bold">Tim</div>
                    <div class="text-sm text-gray-700 dark:text-gray-400">
                      <div
                        class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        <img
                          src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
                          class="w-8 h-8 rounded"
                        />
                        <div class="flex flex-col px-4">
                          <a
                            href="#"
                            class="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >Tim A</a
                          >
                          <span class="text-zinc-400 text-xs">Manychat.id</span>
                        </div>
                      </div>
                      <div
                        class="flex items-center px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                      >
                        <img
                          src="https://media.licdn.com/dms/image/D560BAQHdDHdh6paD8w/company-logo_200_200/0/1683694599437/manypage_id_logo?e=2147483647&v=beta&t=AR8JGUIgIDaqYxBEHizyD1IgGVUzaf6AUxIA8qHrKGc"
                          class="w-8 h-8 rounded"
                        />
                        <div class="flex flex-col px-4 py-2">
                          <a
                            href="#"
                            class="block hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >Tim B</a
                          >
                          <span class="text-zinc-400 text-xs">Manypage.id</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="py-1">
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Lihat Semua</a
                    >
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >Buat Tim</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <c-button
            text="Buat"
            type="default"
            size="sm"
            custom-class="!px-4 !m-0"
          />
        </div>
        <div class="flex items-center">
          <div class="flex items-center ms-3">
            <div>
              <button
                type="button"
                class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded="false"
                data-dropdown-toggle="dropdown-user"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  alt="user photo"
                />
              </button>
            </div>
            <div
              class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div class="px-4 py-3" role="none">
                <p class="text-sm text-gray-900 dark:text-white" role="none">
                  {{ authStore.user.displayName }}
                </p>
                <p
                  class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                  role="none"
                >
                  {{ authStore.user.email }}
                </p>
              </div>
              <ul class="py-1" role="none">
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Dashboard</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Settings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Earnings</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    @click="signOut()"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                    >Sign out</a
                  >
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
import cButton from "@/components/button/c-button.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
async function signOut() {
  localStorage.removeItem("auth");
  location.href = "/login/admin";
}

function toHome() {
  router.push("/admin");
}
</script>

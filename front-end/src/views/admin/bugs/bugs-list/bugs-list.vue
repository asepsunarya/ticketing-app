<template>
  <table class="w-full text-sm text-left rtl:text-right text-gray-500">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" class="p-4">
          <div class="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="checkbox-all-search" class="sr-only">checkbox</label>
          </div>
        </th>
        <th scope="col" class="px-6 py-3">Name</th>
        <th scope="col" class="px-6 py-3">Position</th>
        <th scope="col" class="px-6 py-3">Status</th>
        <th scope="col" class="px-6 py-3">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="bg-white border-b hover:bg-gray-50">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="checkbox-table-search-1" class="sr-only"
              >checkbox</label
            >
          </div>
        </td>
        <th
          scope="row"
          class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
        >
          <img class="w-10 h-10 rounded-full" src="" alt="Jese image" />
          <div class="ps-3">
            <div class="text-base font-semibold">Neil Sims</div>
            <div class="font-normal text-gray-500">neil.sims@flowbite.com</div>
          </div>
        </th>
        <td class="px-6 py-4">React Developer</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            Online
          </div>
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600">Edit user</a>
        </td>
      </tr>
      <tr class="bg-white border-b hover:bg-gray-50">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-2"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="checkbox-table-search-2" class="sr-only"
              >checkbox</label
            >
          </div>
        </td>
        <th
          scope="row"
          class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <img class="w-10 h-10 rounded-full" src="" alt="Jese image" />
          <div class="ps-3">
            <div class="text-base font-semibold">Bonnie Green</div>
            <div class="font-normal text-gray-500">bonnie@flowbite.com</div>
          </div>
        </th>
        <td class="px-6 py-4">Designer</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            Online
          </div>
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600">Edit user</a>
        </td>
      </tr>
      <tr class="bg-white border-b hover:bg-gray-50">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-2"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="checkbox-table-search-2" class="sr-only"
              >checkbox</label
            >
          </div>
        </td>
        <th
          scope="row"
          class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <img class="w-10 h-10 rounded-full" src="" alt="Jese image" />
          <div class="ps-3">
            <div class="text-base font-semibold">Jese Leos</div>
            <div class="font-normal text-gray-500">jese@flowbite.com</div>
          </div>
        </th>
        <td class="px-6 py-4">Vue JS Developer</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            Online
          </div>
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600">Edit user</a>
        </td>
      </tr>
      <tr class="bg-white border-b hover:bg-gray-50">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-2"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="checkbox-table-search-2" class="sr-only"
              >checkbox</label
            >
          </div>
        </td>
        <th
          scope="row"
          class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <img class="w-10 h-10 rounded-full" src="" alt="Jese image" />
          <div class="ps-3">
            <div class="text-base font-semibold">Thomas Lean</div>
            <div class="font-normal text-gray-500">thomes@flowbite.com</div>
          </div>
        </th>
        <td class="px-6 py-4">UI/UX Engineer</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
            Online
          </div>
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600">Edit user</a>
        </td>
      </tr>
      <tr class="bg-white hover:bg-gray-50">
        <td class="w-4 p-4">
          <div class="flex items-center">
            <input
              id="checkbox-table-search-3"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label for="checkbox-table-search-3" class="sr-only"
              >checkbox</label
            >
          </div>
        </td>
        <th
          scope="row"
          class="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <img class="w-10 h-10 rounded-full" src="" alt="Jese image" />
          <div class="ps-3">
            <div class="text-base font-semibold">Leslie Livingston</div>
            <div class="font-normal text-gray-500">leslie@flowbite.com</div>
          </div>
        </th>
        <td class="px-6 py-4">SEO Specialist</td>
        <td class="px-6 py-4">
          <div class="flex items-center">
            <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>
            Offline
          </div>
        </td>
        <td class="px-6 py-4">
          <a href="#" class="font-medium text-blue-600">Edit user</a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

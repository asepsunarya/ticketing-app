<template>
  <div>
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="text-2xl font-semibold">Laporan Tiket</div>
        <div class="text-sm text-zinc-500 mt-1">
          Pantau statistik tiket dan progres penanganan tiket pada proyek ini.
        </div>
      </div>
      <ui-select v-model="selectedYear" class="w-40" @change="handleGetReport">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </ui-select>
    </div>

    <div v-if="loading" class="mt-10 text-zinc-500">Memuat laporan...</div>

    <template v-else-if="report">
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
        <div v-for="card in summaryCards" :key="card.title" class="border rounded-xl p-5 bg-white shadow-sm">
          <div class="text-sm text-zinc-500">{{ card.title }}</div>
          <div class="text-3xl font-semibold mt-2">{{ card.value }}</div>
          <div class="text-xs text-zinc-400 mt-2">{{ card.description }}</div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <div class="border rounded-xl p-5 bg-white shadow-sm">
          <div class="font-semibold text-lg mb-4">Statistik Status Tiket</div>
          <div class="space-y-3">
            <div v-for="item in statusItems" :key="item.key">
              <div class="flex justify-between text-sm mb-1">
                <span>{{ item.label }}</span>
                <span class="font-semibold">{{ item.count }}</span>
              </div>
              <div class="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div class="h-full rounded-full" :class="item.color" :style="`width: ${getPercent(item.count)}%`"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="border rounded-xl p-5 bg-white shadow-sm">
          <div class="font-semibold text-lg mb-4">Penanganan Tiket</div>
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg bg-blue-50 p-4">
              <div class="text-sm text-blue-500">Sudah Ditangani</div>
              <div class="text-2xl font-semibold text-blue-700">{{ report.handling.handled }}</div>
            </div>
            <div class="rounded-lg bg-amber-50 p-4">
              <div class="text-sm text-amber-500">Belum Ditangani</div>
              <div class="text-2xl font-semibold text-amber-700">{{ report.handling.unhandled }}</div>
            </div>
            <div class="rounded-lg bg-green-50 p-4">
              <div class="text-sm text-green-500">Tiket Ditugaskan</div>
              <div class="text-2xl font-semibold text-green-700">{{ report.assignment.assigned }}</div>
            </div>
            <div class="rounded-lg bg-rose-50 p-4">
              <div class="text-sm text-rose-500">Belum Ditugaskan</div>
              <div class="text-2xl font-semibold text-rose-700">{{ report.assignment.unassigned }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="border rounded-xl p-5 bg-white shadow-sm mt-8">
        <div class="font-semibold text-lg mb-4">Tren Tiket per Bulan</div>
        <div class="space-y-3">
          <div v-for="month in visibleMonthly" :key="month.month" class="grid grid-cols-[90px_1fr_50px] items-center gap-3 text-sm">
            <div>{{ monthNames[month.month - 1] }}</div>
            <div class="h-3 bg-zinc-100 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" :style="`width: ${getPercent(month.all)}%`"></div>
            </div>
            <div class="font-semibold text-right">{{ month.all }}</div>
          </div>
        </div>
      </div>

      <div class="border rounded-xl p-5 bg-white shadow-sm mt-8">
        <div class="font-semibold text-lg mb-4">Aktivitas Tiket Terbaru</div>
        <div v-if="report.latestTickets.length" class="relative overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-black border-b">
              <tr>
                <th class="px-4 py-3 font-semibold">Fitur</th>
                <th class="px-4 py-3 font-semibold">Status</th>
                <th class="px-4 py-3 font-semibold">Prioritas</th>
                <th class="px-4 py-3 font-semibold">Assignee</th>
                <th class="px-4 py-3 font-semibold">Update Terakhir</th>
              </tr>
            </thead>
            <tbody class="text-black">
              <tr v-for="ticket in report.latestTickets" :key="ticket._id" class="border-b hover:bg-gray-50">
                <td class="px-4 py-3 font-medium">{{ ticket.feature }}</td>
                <td class="px-4 py-3 capitalize">{{ getStatusLabel(ticket.status) }}</td>
                <td class="px-4 py-3 capitalize">{{ ticket.urgencyLevel || '-' }}</td>
                <td class="px-4 py-3">{{ ticket.assignedBy?.name || 'Belum ditugaskan' }}</td>
                <td class="px-4 py-3">{{ formatDate(ticket.updatedAt) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-zinc-400">Belum ada aktivitas tiket pada tahun ini.</div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import uiSelect from "@/components/select/ui-select.vue";
import { useProjectStore } from "@/stores/project";
import { getTicketReport } from "./services/reports.service";
import type { TicketReportResult } from "./services/reports.struct";

const projectStore = useProjectStore();
const years = ["2023", "2024", "2025", "2026"];
const selectedYear = ref("2026");
const loading = ref(false);
const report = ref<TicketReportResult>();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

const statusItems = computed(() => [
  { key: "open", label: "Open", count: report.value?.status.open || 0, color: "bg-blue-500" },
  { key: "inprogress", label: "Sedang Dikerjakan", count: report.value?.status.inprogress || 0, color: "bg-purple-500" },
  { key: "pending", label: "Pending", count: report.value?.status.pending || 0, color: "bg-amber-500" },
  { key: "closed", label: "Ditutup", count: report.value?.status.closed || 0, color: "bg-green-500" },
]);

const summaryCards = computed(() => [
  { title: "Total Tiket", value: report.value?.status.all || 0, description: `Semua tiket tahun ${selectedYear.value}` },
  { title: "Tiket Ditutup", value: report.value?.status.closed || 0, description: "Jumlah tiket selesai" },
  { title: "Rasio Selesai", value: `${report.value?.handling.completionRate || 0}%`, description: "Persentase tiket ditutup" },
  { title: "Rata-rata Penanganan", value: `${report.value?.handling.averageClosedDays || 0} hari`, description: "Rata-rata tiket ditutup" },
]);

const visibleMonthly = computed(() => report.value?.monthly.filter((month) => month.all > 0) || []);

function getPercent(count: number) {
  const total = report.value?.status.all || 0;
  return total ? Math.round((count / total) * 100) : 0;
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    open: "Open",
    inprogress: "Sedang Dikerjakan",
    pending: "Pending",
    closed: "Ditutup",
  };
  return labels[status] || status;
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString("id");
}

async function handleGetReport() {
  if (!projectStore.selected?._id) return;
  loading.value = true;
  try {
    report.value = await getTicketReport(projectStore.selected._id, selectedYear.value);
  } catch (error) {
    console.log("error : ", error);
  } finally {
    loading.value = false;
  }
}

watch(
  () => projectStore.selected,
  async () => {
    await handleGetReport();
  }
);

onMounted(async () => {
  await handleGetReport();
});
</script>

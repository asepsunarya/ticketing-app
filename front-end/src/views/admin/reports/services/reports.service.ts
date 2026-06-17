import axios from "@/libraries/axios";
import type { TicketReportResult } from "./reports.struct";

export async function getTicketReport(projectId: string, year: string) {
  return await axios<TicketReportResult>({
    method: "GET",
    url: "/admin/ticket/report",
    params: { projectId, year },
  });
}

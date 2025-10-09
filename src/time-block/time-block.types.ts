import { Dashboards, TimeBlock } from '@prisma/client'

export interface ITimeBlocksResponse {
  dashboard: Dashboards
  timeBlocks: TimeBlock[]
}
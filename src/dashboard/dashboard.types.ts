import { TimeBlock } from '@prisma/client'

export interface IDashboardResponse {
  id: string
  title: string
  isArchived: boolean
  createdAt: Date
  updatedAt: Date
  timeBlocks: TimeBlock[]
}

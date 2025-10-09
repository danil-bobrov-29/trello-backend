import { CreateTimeBlockDto, TimeBlockColor } from './dto/time-block.dto'

export const createTimeBlockDefault: CreateTimeBlockDto[] = [
  {
    title: 'Сегодня',
    description: 'Задачи на сегодня',
    order: 0,
    color: TimeBlockColor.RED,
  },
  {
    title: 'Завтра',
    description: 'Задачи на завтра',
    order: 1,
    color: TimeBlockColor.BLUE,
  },
  {
    title: 'На этой неделе',
    description: 'Задачи на эту неделю',
    order: 2,
    color: TimeBlockColor.GRAY,
  },
]

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/guard/auth.guard'
import { DashboardGuard } from '../dashboard/guard/dashboard.guard'
import { TimeBlockGuard } from '../time-block/guard/time-block.guard'
import { CardService } from './card.service'
import { CreateCardDto, UpdateCardDto } from './dto/card.dto'

@UseGuards(AuthGuard, DashboardGuard)
@Controller('dashboard/:dashboardId/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(TimeBlockGuard)
  async createCard(
    @Query('timeBlockId') timeBlockId: string,
    @Body() cardData: CreateCardDto
  ) {
    return await this.cardService.create({
      ...cardData,
      timeBlock: { connect: { id: timeBlockId } },
    })
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @UseGuards(TimeBlockGuard)
  async getCard(
    @Query('timeBlockId') timeBlockId: string,
    @Param('id') id: string
  ) {
    return await this.cardService.findOne(id, { timeBlockId })
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @UseGuards(TimeBlockGuard)
  async updateParamsCard(
    @Param('id') id: string,
    @Query('timeBlockId') timeBlockId: string,
    @Body() updateCardDto: UpdateCardDto
  ) {
    return await this.cardService.update(id, updateCardDto, {
      timeBlockId,
    })
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @UseGuards(TimeBlockGuard)
  async deleteCard(
    @Param('id') id: string,
    @Query('timeBlockId') timeBlockId: string
  ) {
    return await this.cardService.remove(id, { timeBlockId })
  }
}

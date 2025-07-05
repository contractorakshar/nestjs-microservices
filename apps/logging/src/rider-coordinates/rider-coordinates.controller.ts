import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatCoordinateDTO } from './dto/create-coordinates.dto';
import { RiderCoordinatesService } from './rider-coordinates.service';

@Controller('rider-coordinates')
export class RiderCoordinatesController {
  constructor(private riderCooordinatesService: RiderCoordinatesService) {}
  @Get(':id')
  async getRiderCoordinates(
    @Param()
    params: any,
  ) {
    console.log("🚀 ~ RiderCoordinatesController ~ params:", params)
    return await this.riderCooordinatesService.getRiderCoordinates(params.id);
  }
  @Post()
  async saveRiderCoordinates(
    @Body()
    creatCoordinateDTO: CreatCoordinateDTO,
  ) {
    return await this.riderCooordinatesService.saveRiderCoordinates(
      creatCoordinateDTO,
    );
  }
}

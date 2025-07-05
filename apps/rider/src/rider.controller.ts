import { Controller, Get, Param } from '@nestjs/common';
import { RiderService } from './rider.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  // @Get(':id')
  @MessagePattern({ cmd: 'get-rider' })
  async getRiderById(data: any) {
    return Promise.resolve({
      _id: data.id,
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
    });
  }
}

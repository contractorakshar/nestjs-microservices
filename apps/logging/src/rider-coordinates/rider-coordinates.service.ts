import { Inject, Injectable } from '@nestjs/common';
import { CreatCoordinateDTO } from './dto/create-coordinates.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RiderCoordinate } from './schemas/rider-coordinates.schema';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RiderCoordinatesService {
  constructor(
    @InjectModel(RiderCoordinate.name)
    private readonly riderCoordinateModel: Model<RiderCoordinate>,
    @Inject('RIDER_SERVICE') private client: ClientProxy,
  ) {}

  async saveRiderCoordinates(creatCoordinateDTO: CreatCoordinateDTO) {
    return await this.riderCoordinateModel.create(creatCoordinateDTO);
  }

  async getRiderCoordinates(riderId: string) {
    const coordinates = await this.riderCoordinateModel
      .find({ rider: riderId }, { lat: 1, lng: 1, _id: 0 })
      .lean();
    const pattern = { cmd: 'get-rider' };
    const payload = { id: riderId };
    const riderDetails = await firstValueFrom(this.client.send(pattern, payload));
    return { coordinates, ...riderDetails };
  }
}

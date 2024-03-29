import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from './entity/video.entity';
import { videoRequest } from './dto/request/VideoRequest.dto';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  private readonly logger = new Logger('Video');

  public async getVideo({ id }: videoRequest): Promise<Video[]> {
    const video = await this.videoRepository
      .createQueryBuilder('video')
      .where('video.titleId = :id', { id: id })
      .select(['video.id', 'video.video_name', 'video.video_url'])
      .getMany();

    await this.logger.log('Get Video');
    return video;
  }
}

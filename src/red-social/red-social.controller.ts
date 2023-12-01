import { Body, Controller, Post } from '@nestjs/common';
import { RedSocialService } from './red-social.service';
import { RedSocialDto } from './red-social.dto';
import { RedSocialEntity } from './red-social.entity';
import { plainToInstance } from 'class-transformer';

@Controller('red-social')
export class RedSocialController {
  constructor(
    private readonly redsocialService: RedSocialService,
  ){}

  @Post()
  async create(@Body() redsocialDto:RedSocialDto){
    const redsocial:RedSocialEntity = plainToInstance(RedSocialEntity,redsocialDto);
    return await this.redsocialService.createLibreria(redsocial);
  }

}

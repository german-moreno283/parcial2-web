import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedSocialEntity } from './red-social.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class RedSocialService {
  constructor(
    @InjectRepository(RedSocialEntity)
    private readonly redSocialRepository: Repository<RedSocialEntity>
  ){}
  async createLibreria(redSocial: RedSocialEntity){
    if(redSocial.slogan.length===0)
      throw new BusinessLogicException("El slogan no puede estar vacio", BusinessError.PRECONDITION_FAILED);
    return await this.redSocialRepository.save(redSocial);
  }
}

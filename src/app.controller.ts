import { Controller, Get, Param, Query, Render } from '@nestjs/common';
import { DigimonService } from './digimon.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/v1')
@ApiTags('digimon')
export class AppController {
  constructor(private readonly digimonService: DigimonService) {}

  @Get('digimon')
  @Render('digimon-list')
  @ApiOperation({ summary: 'Get all digimon' })
  getDigimonList(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
    @Query('name') name?: string,
    @Query('level') level?: string,
  ) {
    return this.digimonService.getDigimonList(page, pageSize, name, level).pipe(
      map(data => ({ 
        digimon: Array.isArray(data) ? data : [data],
        searchTerm: name,
        currentLevel: level
      }))
    );
  }

  @Get('digimon/filter-by-name')
  @Render('digimon-list')
  @ApiOperation({ summary: 'Filter Digimon by name' })
  filterByName(@Query('name') name: string) {
    return this.digimonService.getDigimonList(undefined, undefined, name).pipe(
      map(data => ({ 
        digimon: Array.isArray(data) ? data : [data],
        searchTerm: name,
      }))
    );
  }

  @Get('digimon/:name')
  @Render('digimon-details')
  @ApiOperation({ summary: 'Get a digimon by name' })
  getDigimonByName(@Param('name') name: string) {
    return this.digimonService.getDigimonByName(name).pipe(
      map(data => ({ digimon: data }))
    );
  }

  @Get('digimon/all')
  @Render('digimon-list')
  @ApiOperation({ summary: 'Get all Digimon' })
  getAllDigimon() {
    return this.digimonService.getDigimonList().pipe(
      map(data => ({ digimon: data }))
    );
  }

  @Get('digimon/filter-by-level')
  @Render('digimon-list')
  @ApiOperation({ summary: 'Filter Digimon by level' })
  filterByLevel(@Query('level') level: string) {
    return this.digimonService.getDigimonList(undefined, undefined, undefined, level).pipe(
      map(data => ({ 
        digimon: Array.isArray(data) ? data : [data],
        currentLevel: level,
      }))
    );
  }
}

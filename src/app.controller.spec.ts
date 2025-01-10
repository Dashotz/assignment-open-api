import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { DigimonService } from './digimon.service';
import { of } from 'rxjs';

describe('AppController', () => {
  let appController: AppController;
  let digimonService: DigimonService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [DigimonService],
    }).compile();

    appController = app.get<AppController>(AppController);
    digimonService = app.get<DigimonService>(DigimonService);
  });

  describe('getDigimonByName', () => {
    it('should return a digimon by name', () => {
      const result = { name: 'Agumon', level: 'Rookie' };
      jest.spyOn(digimonService, 'getDigimonByName').mockImplementation(() => of(result));
      
      expect(appController.getDigimonByName('Agumon')).toBe(of(result));
    });
  });
});

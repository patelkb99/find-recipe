import { Injectable, HttpService } from '@nestjs/common';
import { RecipePuppyData, VeryLongThing } from './interfaces/recipe.interface';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { NutritionPayloadDto } from './dto/nutritionpayload.dto';

@Injectable()
export class RecipesService {
    constructor(private readonly httpService: HttpService) {}        

    getRecipePuppyData(url: string): Observable<AxiosResponse<RecipePuppyData>> {
        return this.httpService.get(url);
    }

    getDownstreamFoodsResponseData(url: string, payload: NutritionPayloadDto, headers): Observable<AxiosResponse<VeryLongThing>> {
        return this.httpService.post(url, payload, { headers });
    }
}
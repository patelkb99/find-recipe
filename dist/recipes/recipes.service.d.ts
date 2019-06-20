import { HttpService } from '@nestjs/common';
import { RecipePuppyData, VeryLongThing } from './interfaces/recipe.interface';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { NutritionPayloadDto } from './dto/nutritionpayload.dto';
export declare class RecipesService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getRecipePuppyData(url: string): Observable<AxiosResponse<RecipePuppyData>>;
    getDownstreamFoodsResponseData(url: string, payload: NutritionPayloadDto, headers: any): Observable<AxiosResponse<VeryLongThing>>;
}

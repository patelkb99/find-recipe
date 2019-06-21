import { Module, HttpModule } from '@nestjs/common';
import { RecipesController } from './recipes/recipes.controller';
import { RecipesService } from './recipes/recipes.service';

@Module({
  controllers: [RecipesController],
  imports: [HttpModule],
  providers: [RecipesService],
})
export class AppModule {}

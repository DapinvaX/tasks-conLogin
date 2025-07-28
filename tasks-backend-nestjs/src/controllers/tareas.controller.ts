import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  ParseIntPipe, 
  UseGuards
} from '@nestjs/common';
import { TareasService } from '../tareas/tareas.service';
import { CreateTareaDto } from '../tareas/dto/create-tarea.dto';
import { UpdateTareaDto } from '../tareas/dto/update-tarea.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators';

@Controller('tareas')
@UseGuards(JwtAuthGuard)
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  @Post()
  create(@Body() createTareaDto: CreateTareaDto, @CurrentUser() user: any) {
    return this.tareasService.create(createTareaDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.tareasService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.tareasService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTareaDto: UpdateTareaDto,
    @CurrentUser() user: any,
  ) {
    return this.tareasService.update(id, updateTareaDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: any) {
    return this.tareasService.remove(id, user.id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ChroniclesService } from './chronicles.service';
import { CreateChronicleDto } from './dto/create-chronicle.dto';
import { UpdateChronicleDto } from './dto/update-chronicle.dto';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

// Define cómo es tu usuario en el request
interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    // ... otros campos
  };
}

@Controller('chronicles')
export class ChroniclesController {
  constructor(private readonly chroniclesService: ChroniclesService) {}


  @Roles(Role.SUPERADMIN, Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createChronicleDto: CreateChronicleDto) {
    return this.chroniclesService.create(createChronicleDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.chroniclesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chroniclesService.findOne(+id);
  }
@Get('my/list')
@UseGuards(JwtAuthGuard)
async getMyChronicles(@Req() req: any) {
  // Accedemos a la propiedad correcta: 'userId'
  const userId = req.user.userId; 
  
  console.log("ID extraído con éxito:", userId);

  // Ya no necesitamos tanto log, esto debería funcionar directo:
  return this.chroniclesService.findByUser(Number(userId));
}

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChronicleDto: UpdateChronicleDto) {
    return this.chroniclesService.update(+id, updateChronicleDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chroniclesService.remove(+id);
  }
}

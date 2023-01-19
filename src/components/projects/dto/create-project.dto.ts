import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'Nejira', description: "The project's name." })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'NEJ',
    description: "The short project's code to use in tasks as a part of task name, recommended 3-5 symbols.",
  })
  @IsString()
  code: string;
}

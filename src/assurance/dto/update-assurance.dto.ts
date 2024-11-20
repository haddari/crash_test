import { PartialType } from '@nestjs/swagger';
import { CreateAssuranceDto } from './create-assurance.dto';

export class UpdateAssuranceDto extends PartialType(CreateAssuranceDto) {}

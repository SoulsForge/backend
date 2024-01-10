import {IsBoolean} from 'class-validator';

export class UpdateSettingsDto {
  @IsBoolean()
  compactVisualization: boolean;
  @IsBoolean()
  rowVisualization: boolean;
  @IsBoolean()
  darkMode: boolean;
}

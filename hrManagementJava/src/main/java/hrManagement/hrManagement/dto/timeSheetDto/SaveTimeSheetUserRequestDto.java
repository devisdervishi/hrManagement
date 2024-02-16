package hrManagement.hrManagement.dto.timeSheetDto;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.dto.userDto.SaveUserRequestDto;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Data
@Builder
public class SaveTimeSheetUserRequestDto {
  private SaveTimeSheetDto saveTimeSheetDto;
  private User user;
}

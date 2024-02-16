package hrManagement.hrManagement.dto.timeSheetDto;

import hrManagement.hrManagement.enums.TimeSheetStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UpdateTimeSheetManagerRequestDto {
    private TimeSheetStatus status;
    private String modifiedBy;
}

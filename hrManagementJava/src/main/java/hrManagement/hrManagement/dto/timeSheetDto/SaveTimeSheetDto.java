package hrManagement.hrManagement.dto.timeSheetDto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class SaveTimeSheetDto {
    private Date fromDate;
    private Date toDate;
    private String note;
    private String createdBy;
}

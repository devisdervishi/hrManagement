package hrManagement.hrManagement.dto.timeSheetDto;

import lombok.Builder;
import lombok.Data;

import java.util.Date;
@Data
@Builder
public class EditedTsOverlapDto {
    Date fromDate;
    Date toDate;
    Integer userId;
    Integer tsId;
}

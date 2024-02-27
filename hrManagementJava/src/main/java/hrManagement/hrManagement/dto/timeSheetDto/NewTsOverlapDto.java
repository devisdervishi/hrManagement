package hrManagement.hrManagement.dto.timeSheetDto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;

@Data
@Builder
public class NewTsOverlapDto {
    Date fromDate;
    Date toDate;
    Integer userId;
}

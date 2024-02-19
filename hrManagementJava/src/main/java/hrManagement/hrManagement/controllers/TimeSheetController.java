package hrManagement.hrManagement.controllers;

import hrManagement.hrManagement.Entities.TimeSheet;
import hrManagement.hrManagement.dto.DeletedEntityDto;
import hrManagement.hrManagement.dto.timeSheetDto.SaveTimeSheetDto;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetManagerRequestDto;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetUserRequestDto;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.services.TimeSheetService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("timeSheets")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TimeSheetController {
    private TimeSheetService timeSheetService;

    @PostMapping("/save/{userId}")
    public ResponseEntity<SaveTimeSheetDto> saveTimeSheet(
            @RequestBody SaveTimeSheetDto dto, @PathVariable("userId") Integer userId) throws Exception {
        return timeSheetService.saveTimeSheet(dto,userId);
    }
    @PatchMapping("/updateByUser/{id}")
    public ResponseEntity<UpdateTimeSheetUserRequestDto> updateTimeSheetUser(
            @PathVariable("id") Integer tshId,@RequestBody UpdateTimeSheetUserRequestDto dto) throws Exception {
        return timeSheetService.updateTimeSheetUser(tshId,dto);
    }

    @PatchMapping("/updateByManager/{id}")
    public ResponseEntity<UpdateTimeSheetManagerRequestDto> updateTimeSheetManager(
            @PathVariable("id") Integer tshId,@RequestBody UpdateTimeSheetManagerRequestDto dto) throws Exception {
        return timeSheetService.updateTimeSheetManager(tshId, dto);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<DeletedEntityDto> deleteTimeSheet(@PathVariable("id") Integer tshId) throws EntityNotFoundException {
        return timeSheetService.deleteTimeSheet(tshId);
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<List<TimeSheet>> getTimeSheetsByUserId(@PathVariable("id")Integer userId){
        return timeSheetService.getAllTimeSheetsByUserId(userId);
    }

}

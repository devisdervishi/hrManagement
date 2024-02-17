package hrManagement.hrManagement.services;

import hrManagement.hrManagement.Entities.TimeSheet;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetManagerRequestDto;
import hrManagement.hrManagement.dto.timeSheetDto.SaveTimeSheetUserRequestDto;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetUserRequestDto;
import hrManagement.hrManagement.enums.TimeSheetStatus;
import hrManagement.hrManagement.exceptions.CommonException;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.repositories.TimeSheetRepository;
import hrManagement.hrManagement.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class TimeSheetService {
    private TimeSheetRepository timeSheetRepository;
    private UserService userService;

    public ResponseEntity<SaveTimeSheetUserRequestDto> saveTimeSheet(SaveTimeSheetUserRequestDto dto) throws Exception {
        TimeSheet newTimeSheet = TimeSheet.builder()
                .fromDate(dto.getSaveTimeSheetDto().getFromDate())
                .toDate(dto.getSaveTimeSheetDto().getToDate())
                .note(dto.getSaveTimeSheetDto().getNote())
                .status(TimeSheetStatus.PENDING)
                .user(dto.getUser())
                .createdAt(new Date(System.currentTimeMillis()))
                .createdBy(dto.getUser().getUsername())
                .build();
        Long dayDifferenceMilliseconds=newTimeSheet.getToDate().getTime()-newTimeSheet.getFromDate().getTime();
        if(newTimeSheet.getFromDate().getYear()!=new Date().getYear()||newTimeSheet.getToDate().getYear()!=new Date().getYear()){
            throw new CommonException("From date and To date must be in the current year");
        }
        if (dayDifferenceMilliseconds<0){throw new CommonException("To date must be after the from Date");}
        Integer diffInDays = Math.toIntExact(TimeUnit.DAYS.convert(dayDifferenceMilliseconds, TimeUnit.MILLISECONDS));
        if(newTimeSheet.getUser().getDaysOff()<diffInDays){
            throw new CommonException("User doesnt have enough days off!");
        }
        timeSheetRepository.save(newTimeSheet);
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<UpdateTimeSheetUserRequestDto> updateTimeSheetUser(Integer id, UpdateTimeSheetUserRequestDto dto) throws Exception {
        Optional<TimeSheet> tshToBeUpdated = timeSheetRepository.findById(id);
        if (tshToBeUpdated.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
        }
        Long dayDifferenceMilliseconds=dto.getToDate().getTime()-dto.getFromDate().getTime();
        if (dayDifferenceMilliseconds<0){throw new CommonException("To date must be after the from Date");}
        Integer diffInDays = Math.toIntExact(TimeUnit.DAYS.convert(dayDifferenceMilliseconds, TimeUnit.MILLISECONDS));
        if(tshToBeUpdated.get().getUser().getDaysOff()<diffInDays){
            throw new CommonException("User doesnt have enough days off!");
        }
        if(dto.getFromDate().getYear()!=new Date().getYear()||dto.getToDate().getYear()!=new Date().getYear()){
            throw new CommonException("From date and To date must be in the current year");
        }
        tshToBeUpdated.get().setFromDate(dto.getFromDate());
        tshToBeUpdated.get().setToDate(dto.getToDate());
        tshToBeUpdated.get().setNote(dto.getNote());
        tshToBeUpdated.get().setModifiedAt(new Date(System.currentTimeMillis()));
        tshToBeUpdated.get().setModifiedBy(dto.getModifiedBy());
        timeSheetRepository.save(tshToBeUpdated.get());
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<UpdateTimeSheetManagerRequestDto> updateTimeSheetManager(Integer id, UpdateTimeSheetManagerRequestDto dto) throws Exception {
        Optional<TimeSheet> tshToBeUpdated = timeSheetRepository.findById(id);
        if (tshToBeUpdated.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
        }
        if(dto.getStatus()==TimeSheetStatus.APPROVED){
            Long dayDifferenceMilliseconds=tshToBeUpdated.get().getToDate().getTime()-tshToBeUpdated.get().getFromDate().getTime();
            Integer diffInDays = Math.toIntExact(TimeUnit.DAYS.convert(dayDifferenceMilliseconds, TimeUnit.MILLISECONDS));
            userService.updateUserDaysOff(tshToBeUpdated.get().getUser().getId(),diffInDays);
        }
        tshToBeUpdated.get().setStatus(dto.getStatus());
        tshToBeUpdated.get().setModifiedAt(new Date(System.currentTimeMillis()));
        tshToBeUpdated.get().setModifiedBy(dto.getModifiedBy());
        timeSheetRepository.save(tshToBeUpdated.get());
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity deleteTimeSheet(Integer id) throws EntityNotFoundException {
        Optional<TimeSheet> tshToBeDeleted = timeSheetRepository.findById(id);
        if (tshToBeDeleted.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
        }
        timeSheetRepository.deleteById(id);
        return ResponseEntity.ok().body("Deleted");
    }
    public ResponseEntity<List<TimeSheet>> getAllTimeSheetsByUserId(Integer userId){
        List<TimeSheet> timeSheets=timeSheetRepository.findTimeSheetsByUserId(userId);
            return ResponseEntity.ok().body(timeSheets);
    }
}


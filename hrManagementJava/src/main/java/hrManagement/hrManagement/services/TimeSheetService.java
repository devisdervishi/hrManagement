package hrManagement.hrManagement.services;

import hrManagement.hrManagement.Entities.TimeSheet;
import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.dto.DeletedEntityDto;
import hrManagement.hrManagement.dto.timeSheetDto.SaveTimeSheetDto;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetManagerRequestDto;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetUserRequestDto;
import hrManagement.hrManagement.enums.TimeSheetStatus;
import hrManagement.hrManagement.exceptions.CommonException;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.repositories.TimeSheetRepository;
import hrManagement.hrManagement.utils.TimeSheetValidations;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@AllArgsConstructor
public class TimeSheetService {
    private TimeSheetRepository timeSheetRepository;
    private UserService userService;

    public ResponseEntity<SaveTimeSheetDto> saveTimeSheet(SaveTimeSheetDto dto, Integer userID) throws Exception {
        Optional<User> user=userService.getUserById(userID);
        if (user.isEmpty()){
            throw new EntityNotFoundException("User with id:"+userID+" doesnt exist");
        }
        TimeSheet newTimeSheet = TimeSheet.builder()
                .fromDate(dto.getFromDate())
                .toDate(dto.getToDate())
                .note(dto.getNote())
                .status(TimeSheetStatus.PENDING)
                .user(user.get())
                .createdAt(new Date(System.currentTimeMillis()))
                .createdBy(user.get().getUsername())
                .build();
        Integer diffInDays = TimeSheetValidations.getBusinessDays(dto.getFromDate(),dto.getToDate());
        List<TimeSheet> thisUserTimesheets=getAllTimeSheetsByUserId(user.get().getId()).getBody();
        for (TimeSheet ts:thisUserTimesheets
             ) {
            if (ts.getStatus()==TimeSheetStatus.PENDING){
                diffInDays+=TimeSheetValidations.getBusinessDays(ts.getFromDate(),ts.getToDate());
            }
            if (TimeSheetValidations.overlap(ts.getFromDate(),ts.getToDate(),dto.getFromDate(),
                    dto.getToDate())){
                throw new CommonException("Time sheet period should not overlap with previous time sheets");
            }
        }
        Long dayDifferenceMilliseconds=newTimeSheet.getToDate().getTime()-newTimeSheet.getFromDate().getTime();
        if(newTimeSheet.getFromDate().getYear()!=new Date().getYear()||newTimeSheet.getToDate().getYear()!=new Date().getYear()){
            throw new CommonException("From date and To date must be in the current year");
        }
        if (dayDifferenceMilliseconds<0){throw new CommonException("To date must be after the from Date");}

        if(newTimeSheet.getUser().getDaysOff()<diffInDays){
            throw new CommonException("User doesnt have enough days off for this time sheet! \n Consider " +
                    "updating the time sheet dates or changing this users other time sheets dates.");
        }
        timeSheetRepository.save(newTimeSheet);
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<UpdateTimeSheetUserRequestDto> updateTimeSheetUser(Integer id, UpdateTimeSheetUserRequestDto dto) throws Exception {
        Optional<TimeSheet> tshToBeUpdated = timeSheetRepository.findById(id);
        if (tshToBeUpdated.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
        }
        if (tshToBeUpdated.get().getStatus()!=TimeSheetStatus.PENDING){
            throw new CommonException("Only time sheets with status of \"PENDING\" can be updated");
        }
        List<TimeSheet> thisUserTimesheets=getAllTimeSheetsByUserId(tshToBeUpdated.get().getUser().getId()).getBody();
        Integer diffInDays= TimeSheetValidations.getBusinessDays(dto.getFromDate(),dto.getToDate());
        for (TimeSheet ts:thisUserTimesheets) {
            if (ts.getId()==tshToBeUpdated.get().getId()){
                continue;
            }
            if (ts.getStatus()==TimeSheetStatus.PENDING){
                diffInDays+=TimeSheetValidations.getBusinessDays(ts.getFromDate(),ts.getToDate());
            }
            if (TimeSheetValidations.overlap(ts.getFromDate(),ts.getToDate(),dto.getFromDate(),
                    dto.getToDate())){
                throw new CommonException("Time sheet period should not overlap with previous time sheets");
            }
        }
        Long dayDifferenceMilliseconds=dto.getToDate().getTime()-dto.getFromDate().getTime();
        if (dayDifferenceMilliseconds<0){throw new CommonException("To date must be after the from Date");}
        if(tshToBeUpdated.get().getUser().getDaysOff()<diffInDays){
            throw new CommonException("User doesnt have enough days off for this time sheet! \n Consider" +
                    " updating the time sheet dates or changing this users other time sheets dates.\"");
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
            Integer diffInDays= TimeSheetValidations.getBusinessDays(tshToBeUpdated.get().getFromDate(),tshToBeUpdated.get().getToDate());
            userService.updateUserDaysOff(tshToBeUpdated.get().getUser().getId(),diffInDays);
        }
        tshToBeUpdated.get().setStatus(dto.getStatus());
        tshToBeUpdated.get().setModifiedAt(new Date(System.currentTimeMillis()));
        tshToBeUpdated.get().setModifiedBy(dto.getModifiedBy());
        timeSheetRepository.save(tshToBeUpdated.get());
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<DeletedEntityDto> deleteTimeSheet(Integer id) throws EntityNotFoundException {
        Optional<TimeSheet> tshToBeDeleted = timeSheetRepository.findById(id);
        if (tshToBeDeleted.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
        }
        timeSheetRepository.deleteById(id);
        return ResponseEntity.ok(DeletedEntityDto.builder().message("Deleted").build());
    }
    public ResponseEntity<List<TimeSheet>> getAllTimeSheetsByUserId(Integer userId){
        List<TimeSheet> timeSheets=timeSheetRepository.findTimeSheetsByUserId(userId);
            return ResponseEntity.ok().body(timeSheets);
    }

}


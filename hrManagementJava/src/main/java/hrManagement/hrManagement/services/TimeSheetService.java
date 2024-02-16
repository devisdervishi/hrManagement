package hrManagement.hrManagement.services;

import hrManagement.hrManagement.Entities.TimeSheet;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetManagerRequestDto;
import hrManagement.hrManagement.dto.timeSheetDto.SaveTimeSheetUserRequestDto;
import hrManagement.hrManagement.dto.timeSheetDto.UpdateTimeSheetUserRequestDto;
import hrManagement.hrManagement.enums.TimeSheetStatus;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.repositories.TimeSheetRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TimeSheetService {
    private TimeSheetRepository timeSheetRepository;

    public ResponseEntity<SaveTimeSheetUserRequestDto> saveTimeSheet(SaveTimeSheetUserRequestDto dto) {
        TimeSheet newTimeSheet = TimeSheet.builder()
                .fromDate(dto.getSaveTimeSheetDto().getFromDate())
                .toDate(dto.getSaveTimeSheetDto().getToDate())
                .note(dto.getSaveTimeSheetDto().getNote())
                .status(TimeSheetStatus.PENDING)
                .user(dto.getUser())
                .createdAt(new Date(System.currentTimeMillis()))
                .createdBy(dto.getUser().getUsername())
                .build();
        timeSheetRepository.save(newTimeSheet);
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<UpdateTimeSheetUserRequestDto> updateTimeSheetUser(Integer id, UpdateTimeSheetUserRequestDto dto) throws EntityNotFoundException {
        Optional<TimeSheet> tshToBeUpdated = timeSheetRepository.findById(id);
        if (tshToBeUpdated.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
        }
        tshToBeUpdated.get().setFromDate(dto.getFromDate());
        tshToBeUpdated.get().setToDate(dto.getToDate());
        tshToBeUpdated.get().setNote(dto.getNote());
        tshToBeUpdated.get().setModifiedAt(new Date(System.currentTimeMillis()));
        tshToBeUpdated.get().setModifiedBy(dto.getModifiedBy());
        timeSheetRepository.save(tshToBeUpdated.get());
        return ResponseEntity.ok(dto);
    }

    public ResponseEntity<UpdateTimeSheetManagerRequestDto> updateTimeSheetManager(Integer id, UpdateTimeSheetManagerRequestDto dto) throws EntityNotFoundException {
        Optional<TimeSheet> tshToBeUpdated = timeSheetRepository.findById(id);
        if (tshToBeUpdated.isEmpty()) {
            throw new EntityNotFoundException("Time Sheet with id:" + id + " doesnt exist");
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


package hrManagement.hrManagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hrManagement.hrManagement.enums.TimeSheetStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class TimeSheet extends BaseEntity {
    @FutureOrPresent
    @NotNull
    private Date fromDate;
    @Future
    @NotNull
    private Date toDate;
    private String note;
    @Enumerated(EnumType.STRING)
    @NotNull
    private TimeSheetStatus status;
    @JsonIgnore
    @ManyToOne(
            optional = false,
            cascade = CascadeType.MERGE,
            fetch = FetchType.LAZY
    )
    @JoinColumn(
            name = "userId",
            referencedColumnName = "id"
    )
    private User user;

}

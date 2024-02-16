package hrManagement.hrManagement.Entities;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@MappedSuperclass
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @PastOrPresent
    private Date createdAt;
    @Length(max = 45 ,message = "Value should contain max 45 chars")
    private String createdBy;
    @PastOrPresent
    private Date modifiedAt;
    @Length(max = 45,message = "Value should contain max 45 chars")
    private String modifiedBy;
}

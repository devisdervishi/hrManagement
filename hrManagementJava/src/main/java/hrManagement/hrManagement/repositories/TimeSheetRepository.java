package hrManagement.hrManagement.repositories;

import hrManagement.hrManagement.Entities.TimeSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface TimeSheetRepository extends JpaRepository<TimeSheet, Integer> {
    @Query(nativeQuery = true, value = "select * from time_sheet as ts where ts.user_id =:u_id")
    List<TimeSheet> findTimeSheetsByUserId(@Param("u_id") Integer userId);

    @Modifying
    @Query(nativeQuery = true, value = "update time_sheet set status=:tsStatus,modified_by=:modifiedBy " +
            ",modified_at=:modifiedAt where id=:id")
    public void updateTimeSheetByManager(@Param("tsStatus") String status,
                                         @Param("modifiedBy") String modifiedBy,
                                         @Param("modifiedAt") Date modifedAt,
                                         @Param("id") Integer id);
}

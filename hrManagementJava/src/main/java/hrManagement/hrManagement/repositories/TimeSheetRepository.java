package hrManagement.hrManagement.repositories;

import hrManagement.hrManagement.Entities.TimeSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeSheetRepository extends JpaRepository<TimeSheet,Integer> {
    @Query(nativeQuery = true,value = "select * from time_sheet as ts where ts.user_id =:u_id")
    List<TimeSheet> findTimeSheetsByUserId(@Param("u_id") Integer userId);
}

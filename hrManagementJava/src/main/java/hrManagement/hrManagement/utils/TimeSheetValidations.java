package hrManagement.hrManagement.utils;

import java.util.Calendar;
import java.util.Date;

public class TimeSheetValidations {
    public static boolean overlap(Date start1, Date end1, Date start2, Date end2) {
        return start1.getTime() <= end2.getTime() && start2.getTime() <= end1.getTime();
    }

    public static int getBusinessDays(Date startDay, Date endDay) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDay);
        int businessDays = 0;

        while (!calendar.getTime().after(endDay)) {
            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
            if (dayOfWeek != Calendar.SATURDAY && dayOfWeek != Calendar.SUNDAY) {
                businessDays++;
            }
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }

        return businessDays;
    }
}

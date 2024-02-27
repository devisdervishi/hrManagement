import { TimeSheetSatus } from "./enums/tsStatus.enum"

export class TimeSheetUpdateManagerRequest{
    status!:TimeSheetSatus
    modifiedBy!: string|null
}
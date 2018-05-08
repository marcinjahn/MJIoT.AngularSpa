import { DeviceConnectionCondition } from "../../enums/device-connection-condition.enum";

export class ListenerDataDto {
    constructor(deviceId: number, propertyId: number, condition: DeviceConnectionCondition, conditionValue: any) {
        this.DeviceId = deviceId;
        this.PropertyId = propertyId;
        this.Condition = condition;
        this.ConditionValue = conditionValue;
    }

    DeviceId: number;
    PropertyId: number;
    Condition: DeviceConnectionCondition;
    ConditionValue: any;
}

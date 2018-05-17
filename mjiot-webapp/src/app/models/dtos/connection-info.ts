import { DevicePropertyPair } from "./device-property-pair";
import { CalendarView } from "ng2-semantic-ui/dist";

export class ConnectionInfo {

    constructor(senderDeviceId: number, senderProeprtyId: number, listenerDeviceId: number, listenerPropertyId: number,
                filterTypeEnum: number, filterValue: string, calculationTypeEnum: number, calculationValue: string) {
        this.Sender = new DevicePropertyPair(senderDeviceId, senderProeprtyId);
        this.Listener = new DevicePropertyPair(listenerDeviceId, listenerPropertyId);
        this.Filter = filterTypeEnum;
        this.FilterValue = filterValue;
        this.Calculation = calculationTypeEnum;
        this.CalculationValue = calculationValue;
    }

    Sender: DevicePropertyPair;
    Listener: DevicePropertyPair;
    Filter: number;
    FilterValue: string;
    Calculation: number;
    CalculationValue: string;
}

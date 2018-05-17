import { DevicePropertyPair } from "./device-property-pair";

export class ConnectionInfo {
    Sender: DevicePropertyPair;
    Listener: DevicePropertyPair;
    Filter: number;
    FilterValue: string;
    Calculation: number;
    CalculationValue: string;
}

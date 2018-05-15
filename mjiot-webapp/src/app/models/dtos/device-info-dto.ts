import { DeviceCommunicationType } from "../../enums/device-communication-type.enum";
import { ListenerDataDto } from "./listener-data-dto";
import { ListenersWithSenderPropertyDto } from "./listeners-with-sender-property-dto";

export class DeviceInfoDto {
    constructor(id: number, name: string, deviceType: string, isConnected: boolean, communicationType: DeviceCommunicationType, connectedListeners: ListenersWithSenderPropertyDto[]) {
        this.Id = id;
        this.Name = name;
        this.DeviceType = deviceType;
        this.IsConnected = isConnected;
        this.CommunicationType = communicationType;
        this.ConnectedListeners = connectedListeners;
    }

    Id: number;
    Name: string;
    DeviceType: string;
    IsConnected: boolean;
    CommunicationType: DeviceCommunicationType;
    ConnectedListeners: ListenersWithSenderPropertyDto[];
}

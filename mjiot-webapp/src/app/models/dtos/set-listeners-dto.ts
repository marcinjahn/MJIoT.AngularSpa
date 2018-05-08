import { ListenerDataDto } from "./listener-data-dto";

export class SetListenersDto {
    constructor(senderId: number, senderPropertyId: number, listeners: ListenerDataDto[]) {
        this.SenderId = senderId;
        this.SenderPropertyId = senderPropertyId;
        this.Listeners = listeners;
    }

    SenderId: number;
    SenderPropertyId: number;
    Listeners: ListenerDataDto[];
}

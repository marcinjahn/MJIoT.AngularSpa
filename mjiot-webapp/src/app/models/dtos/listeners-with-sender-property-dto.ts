import { ListenerDataDto } from "./listener-data-dto";

export class ListenersWithSenderPropertyDto {
    constructor(senderPropertyName: string, listeners: ListenerDataDto[]) {
        this.SenderPropertyName = senderPropertyName;
        this.Listeners = listeners;
    }

    SenderPropertyName: string;
    Listeners: ListenerDataDto[];
}

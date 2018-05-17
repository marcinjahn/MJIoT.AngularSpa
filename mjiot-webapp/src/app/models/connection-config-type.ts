export class ConnectionConfigType {
    enumValue: number;
    displayName: string;
    symbol: string;

    constructor(enumValue: number, displayName: string, symbol: string) {
        this.enumValue = enumValue;
        this.displayName = displayName;
        this.symbol = symbol;
    }
}

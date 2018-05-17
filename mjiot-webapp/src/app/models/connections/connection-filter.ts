import { ConnectionConfigType } from "../connection-config-type";

export class ConnectionFilter {
    static equal = new ConnectionConfigType(0, "equal", "=");
    static greater = new ConnectionConfigType(1, "greater", ">");
    static greaterOrEqual = new ConnectionConfigType(2, "greater or equal", ">=");
    static less = new ConnectionConfigType(3, "less", "<");
    static lessOrEqual = new ConnectionConfigType(4, "less or equal", "<=");
    static notEqual = new ConnectionConfigType(5, "not equal", "!=");
    static none = new ConnectionConfigType(6, "none", "");
}

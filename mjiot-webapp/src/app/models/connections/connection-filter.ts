import { ConnectionConfigType } from "./connection-config-type";

export class ConnectionFilter {
    static None = new ConnectionConfigType(0, "none", "");
    static Equal = new ConnectionConfigType(1, "equal", "=");
    static Greater = new ConnectionConfigType(2, "greater", ">");
    static GreaterOrEqual = new ConnectionConfigType(3, "greater or equal", ">=");
    static Less = new ConnectionConfigType(4, "less", "<");
    static LessOrEqual = new ConnectionConfigType(5, "less or equal", "<=");
    static NotEqual = new ConnectionConfigType(6, "not equal", "!=");

}

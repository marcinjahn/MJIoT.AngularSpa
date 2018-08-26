import { ConnectionConfigType } from "./connection-config-type";

export class ConnectionCalculation {
    static None = new ConnectionConfigType(0, "None", "");
    // static proportional = new ConnectionConfigType(0, "proportional", "~");
    static Addition = new ConnectionConfigType(1, "Addition", "+");
    static Subtraction = new ConnectionConfigType(2, "Subtraction", "-");
    static Product = new ConnectionConfigType(3, "Product", "*");
    static Division = new ConnectionConfigType(4, "Division", "/");
    static BooleanNot = new ConnectionConfigType(5, "NOT", "NOT");
    static BooleanAnd = new ConnectionConfigType(6, "AND", "AND");
    static BooleanOr = new ConnectionConfigType(7, "OR", "OR");
    static Custom = new ConnectionConfigType(8, "Custom", "CUSTOM");
}

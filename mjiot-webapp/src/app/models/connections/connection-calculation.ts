import { ConnectionConfigType } from "./connection-config-type";

export class ConnectionCalculation {
    static None = new ConnectionConfigType(0, "none", "");
    // static proportional = new ConnectionConfigType(0, "proportional", "~");
    static Addition = new ConnectionConfigType(1, "addition", "+");
    static Subtraction = new ConnectionConfigType(2, "subtraction", "-");
    static Product = new ConnectionConfigType(3, "product", "*");
    static Division = new ConnectionConfigType(4, "division", "/");
    static BooleanNot = new ConnectionConfigType(5, "NOT", "NOT");
    static BooleanAnd = new ConnectionConfigType(6, "AND", "AND");
    static BooleanOr = new ConnectionConfigType(7, "OR", "OR");
}

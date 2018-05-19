import { ConnectionConfigType } from "./connection-config-type";

export class ConnectionCalculation {
    static proportional = new ConnectionConfigType(0, "proportional", "~");
    static addition = new ConnectionConfigType(1, "addition", "+");
    static subtraction = new ConnectionConfigType(2, "subtraction", "-");
    static product = new ConnectionConfigType(3, "product", "*");
    static division = new ConnectionConfigType(4, "division", "/");
    static booleanNot = new ConnectionConfigType(5, "NOT", "NOT");
    static booleanAnd = new ConnectionConfigType(6, "AND", "AND");
    static booleanOr = new ConnectionConfigType(7, "OR", "OR");
    static none = new ConnectionConfigType(8, "none", "");
}

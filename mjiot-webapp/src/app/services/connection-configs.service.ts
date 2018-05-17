import { Injectable } from '@angular/core';
import { ConnectionConfigType } from '../models/connection-config-type';
import { ConnectionFilter } from '../models/connections/connection-filter';
import { ConnectionCalculation } from '../models/connections/connection-calculation';

@Injectable()
export class ConnectionConfigsService {

  constructor() { }

  getFilterTypes(senderFormat: number, listenerFormat: number): Array<ConnectionConfigType> {
    let result: Array<ConnectionConfigType> = [];

    if (senderFormat == 2) {
      result.push(ConnectionFilter.equal);
      result.push(ConnectionFilter.greater);
      result.push(ConnectionFilter.greaterOrEqual);
      result.push(ConnectionFilter.less);
      result.push(ConnectionFilter.lessOrEqual);
      result.push(ConnectionFilter.notEqual);
      result.push(ConnectionFilter.none);
    }
    else {
      result.push(ConnectionFilter.equal);
      result.push(ConnectionFilter.notEqual);
      result.push(ConnectionFilter.none);
    }

    return result;
  }

  getCalculationType(senderFormat: number, listenerFormat: number): Array<ConnectionConfigType> {
    let result: Array<ConnectionConfigType> = [];

    //number - number
    if (senderFormat == 2 && listenerFormat == 2) {
      result.push(ConnectionCalculation.proportional);
      result.push(ConnectionCalculation.addition);
      result.push(ConnectionCalculation.subtraction);
      result.push(ConnectionCalculation.product);
      result.push(ConnectionCalculation.division);
      result.push(ConnectionCalculation.none);
    }
    //number - string
    else if (senderFormat == 2 && listenerFormat == 1) {
      result.push(ConnectionCalculation.none);
    }
    //number - boolean
    else if (senderFormat == 2 && listenerFormat == 0) {
      result.push(ConnectionCalculation.booleanAnd);
      result.push(ConnectionCalculation.booleanOr);
      result.push(ConnectionCalculation.booleanNot);
      result.push(ConnectionCalculation.none);
    }

    //string - string
    else if (senderFormat == 1 && listenerFormat == 1) {
      result.push(ConnectionCalculation.none);
    }
    //string - number
    else if (senderFormat == 1 && listenerFormat == 2) {
      result.push(ConnectionCalculation.none);
    }
    //string - bool
    else if (senderFormat == 1 && listenerFormat == 0) {
      result.push(ConnectionCalculation.none);
    }

    //bool - bool
    else if (senderFormat == 0 && listenerFormat == 0) {
      result.push(ConnectionCalculation.booleanAnd);
      result.push(ConnectionCalculation.booleanOr);
      result.push(ConnectionCalculation.booleanNot);
      result.push(ConnectionCalculation.none);
    }
    //bool - number
    else if (senderFormat == 0 && listenerFormat == 2) {
      result.push(ConnectionCalculation.none);
    }
    //bool - string
    else if (senderFormat == 0 && listenerFormat == 1) {
      result.push(ConnectionCalculation.none);
    }

    return result;
  }
}

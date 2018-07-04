import { Injectable } from '@angular/core';
import { ConnectionConfigType } from '../models/connections/connection-config-type';
import { ConnectionFilter } from '../models/connections/connection-filter';
import { ConnectionCalculation } from '../models/connections/connection-calculation';

@Injectable()
export class ConnectionConfigsService {

  constructor() { }

  getFilterTypes(senderFormat: number): Array<ConnectionConfigType> {
    let result: Array<ConnectionConfigType> = [];

    if (senderFormat == 2) {
      result.push(ConnectionFilter.None);
      result.push(ConnectionFilter.Equal);
      result.push(ConnectionFilter.Greater);
      result.push(ConnectionFilter.GreaterOrEqual);
      result.push(ConnectionFilter.Less);
      result.push(ConnectionFilter.LessOrEqual);
      result.push(ConnectionFilter.NotEqual);
    }
    else {
      result.push(ConnectionFilter.None);
      result.push(ConnectionFilter.Equal);
      result.push(ConnectionFilter.NotEqual);
    }

    return result;
  }

  getCalculationTypes(senderFormat: number): Array<ConnectionConfigType> {
    let result: Array<ConnectionConfigType> = [];

    //number
    if (senderFormat == 2) {
      result.push(ConnectionCalculation.None);
      result.push(ConnectionCalculation.Addition);
      result.push(ConnectionCalculation.Subtraction);
      result.push(ConnectionCalculation.Product);
      result.push(ConnectionCalculation.Division);
    }
    //boolean
    else if (senderFormat == 0) {
      result.push(ConnectionCalculation.None);
      result.push(ConnectionCalculation.BooleanNot);
      result.push(ConnectionCalculation.BooleanAnd);
      result.push(ConnectionCalculation.BooleanOr);
    }
    //string
    else if (senderFormat == 0) {
      result.push(ConnectionCalculation.None);
    }

    return result;
  }
}

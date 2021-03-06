import { InjectionToken } from "@angular/core";


export let AuthenticationApiUrl = new InjectionToken<string>("AuthenticationApiUrl");
export let WebAPIUrl = new InjectionToken<string>("WebAPIUrl");
export let PropertiesAPIUrl = new InjectionToken<string>("PropertiesAPIUrl");
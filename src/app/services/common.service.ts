import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  //#region Common Error
  processCommonError(err: any) {
    console.log(err);
  }
  //#endregion
}

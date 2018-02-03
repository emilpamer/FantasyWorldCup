import { Injectable } from '@angular/core';

@Injectable()
export class ProgressService {
groupstageBettingAllowed = true;
knockoutStageBettingAllowed = false;
mathInProgress = false;

  constructor() { }

getGroupStageBettingStatus(): boolean {
  return this.groupstageBettingAllowed;
}

getKnockoutStageBettingStatus(): boolean {
  return this.knockoutStageBettingAllowed;
}

getMathStatus(): boolean {
  return this.mathInProgress;
}

}

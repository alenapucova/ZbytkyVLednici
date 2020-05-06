import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortionsService {

  public static readonly DEFAULT_PORTIONS = 2;
  
  private numberOfPortions = new BehaviorSubject<number>(PortionsService.DEFAULT_PORTIONS);
  portion = this.numberOfPortions.asObservable();

  nextPortions(portion: number) {
    console.log('portion', portion);
    this.numberOfPortions.next(portion);
  }
}

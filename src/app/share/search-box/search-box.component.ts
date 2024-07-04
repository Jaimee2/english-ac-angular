import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, Subject} from "rxjs";


@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  template: `
    <input type="text"
           [placeholder]=this.placeholder
           class="form-control"
           (keyup)="onKeyPress(txtInput.value)"
           (keyup.enter)="emitValue(txtInput.value)"
           [value]="initialValue"
           #txtInput
    >
  `,
  styles: ``
})
export class SearchBoxComponent implements OnInit {
  @Input() public placeholder: string = '';
  @Input() initialValue: string = '';

  @Output() public onValue = new EventEmitter<string>();
  @Output() public onDebounce = new EventEmitter<string>();

  private deBouncer: Subject<string> = new Subject<string>();

  emitValue(value: string) {
    this.onValue.emit(value)
  }

  ngOnInit(): void {
    this.deBouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe(value => {
        console.log('deBouncer value: ', value)
        this.onDebounce.emit(value)
      });
  }

  onKeyPress(searchTerms: string) {
    this.deBouncer.next(searchTerms)
  }

}

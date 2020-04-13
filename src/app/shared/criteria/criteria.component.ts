import {
  Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input,
  OnChanges, SimpleChanges, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  // listFilter: string = 'cart';
  @ViewChild('inputFilter') inputFilterRef: ElementRef;
  @Input() showDetails: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();
  private _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.valueChanges.emit(value);
  }
  constructor() { }


  ngAfterViewInit() {
    if (this.inputFilterRef) {
      this.inputFilterRef.nativeElement.focus();
    }
  }
  ngOnChanges(change: SimpleChanges) {
    if (change['hitCount'] && !change['hitCount'].currentValue) {
      this.hitMessage = 'No match found';
    } else {
      this.hitMessage = 'Hits:' + this.hitCount;
    }

  }

  ngOnInit() {
  }
}

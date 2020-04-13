import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {

  listFilter: string = 'cart';
  @ViewChild('inputFilter') inputFilterRef: ElementRef;
  @Input() showDetails: boolean;
  @Input() hitCount: number;
  hitMessage: string;
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

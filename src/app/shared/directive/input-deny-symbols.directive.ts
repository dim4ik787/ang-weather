import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[inputDenySymbols]'
})
export class InputDenySymbolsDirective {
  @Input() inputDenySymbols!: string;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.inputDenySymbols.indexOf(event.key) !== -1) {
      event.preventDefault();
    }
  }
}
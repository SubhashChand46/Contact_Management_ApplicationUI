import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appNoWhitespace]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NoWhitespaceDirective, multi: true }]
})
export class NoWhitespaceDirective {
  @Input() validationFieldsType: boolean = false;
  @HostListener('keyup', ['$event']) onKeyup(event: KeyboardEvent) {
    this.validateFields(event);
  }
  constructor(private el: ElementRef) { }
  validateFields(event: any) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(/[^A-Za-z ]/g, '')
      event.preventDefault();
    }, 100)
  }
}

import { Directive, HostListener, ElementRef, OnInit  } from '@angular/core';

//小文字⇒大文字、全角⇒半角に変換して、A-Zと0-9、-(ハイフン)以外の記号を入力不可にする

@Directive({
  selector: '[gcdInput]'
})
export class GcdinputDirective {

  private el: HTMLInputElement;
  private value: any;

  constructor(private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  @HostListener("focus", ["$event.target.value"])
  onFocus() {
    this.el.value = this.value; // opossite of transform
  }

  @HostListener("blur", ["$event.target.value"])
  onBlur(value) {
    this.transform(value);
  }

  ngOnInit() {
    this.transform(this.el.value);
  }
  transform(value) {
    // console.log(conv.replace(/[^A-ZＡ-Ｚ0-9０-９－-]/g, ''));
    this.el.value = value.toUpperCase().replace(/[^A-ZＡ-Ｚ0-9０-９－-]/g, '').replace(/[０-９Ａ-Ｚ－]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    this.value=this.el.value;
  }
  getValue(value):string {
    this.transform(value);
    return this.value;
  }
}

import { Directive, ViewContainerRef, TemplateRef, HostListener, EmbeddedViewRef, Input, IterableDiffers, IterableDiffer } from '@angular/core';

@Directive({
  selector: '[appDestroyer]'
})
export class DestroyerDirective {

  @Input() appDestroyerOf: Array<any>;

  iterableDiffer: IterableDiffer<any>;

  constructor(private container: ViewContainerRef,
    private template: TemplateRef<any>, _iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = _iterableDiffers.find([]).create(null);
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.appDestroyerOf);
    if (changes) {
      changes.forEachAddedItem((e) => {
        this.update(e);
      });
      changes.forEachRemovedItem((e) => {
        this.remove(e);
      });
    }
  }

  ngOnChanges() {

  }

  update(input) {
    setTimeout(() => {
      this.container.createEmbeddedView(this.template, {
        $implicit: input,
        index: this.appDestroyerOf.indexOf(input),
      });
    });
  }

  remove(input) {
    debugger;
    setTimeout(() => {
      this.container.remove(input.index);
    });
  }

}

import { Injectable, ComponentFactoryResolver, Injector, ViewContainerRef, ReflectiveInjector, Renderer2, RendererFactory2, ComponentRef } from '@angular/core';
import { PopoverComponent } from '../components/popover/popover.component';
import { defaultOptions } from '../modules/tooltip/options';
import { DomService } from './dom.service';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(private domService: DomService) {
  }

  show(viewContainerRef: ViewContainerRef): ComponentRef<any> {
    return this.domService.appendComponentToBody(PopoverComponent, 'data',
      {
        element: viewContainerRef.element.nativeElement,
        options: defaultOptions
      });
  }

  close(componentRef: ComponentRef<any>) {
    this.domService.removeComponentFromBody(componentRef);
  }
}

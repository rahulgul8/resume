import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, ComponentRef, RendererFactory2, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomService {
  renderer: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef, private injector: Injector, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  appendComponentToBody(component: any, fieldName?: string, data?: any): ComponentRef<any> {
    //create a component reference
    const componentRef: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(component)
      .create(this.injector);

    if (fieldName && data) {
      componentRef.instance[fieldName] = data;
    }

    // attach component to the appRef so that so that it will be dirty checked.
    this.applicationRef.attachView(componentRef.hostView);

    // get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    document.body.appendChild(domElem);

    return componentRef;
  }

  removeComponentFromBody(componentRef: ComponentRef<any>) {
    this.applicationRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }

  appendChild(parent: ViewContainerRef, component: any, fieldName?: string, data?: any) {
    //create a component reference
    const componentRef: ComponentRef<any> = this.componentFactoryResolver.resolveComponentFactory(component)
      .create(this.injector);

    if (fieldName && data) {
      componentRef.instance[fieldName] = data;
    }

    // attach component to the appRef so that so that it will be dirty checked.
    this.applicationRef.attachView(componentRef.hostView);

    // get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    parent.element.nativeElement.appendChild(domElem);
    return componentRef;
  }

  appendChildHtml(parent: ViewContainerRef, component: HTMLElement, fieldName?: string, data?: any) {
    parent.element.nativeElement.appendChild(component);
  }
}

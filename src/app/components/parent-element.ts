import { Input, HostBinding, ChangeDetectorRef, HostListener, ElementRef, ViewChild } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { TemplateComponent } from './template/template.component';
import { DisabledDirective, resolve } from '../directives/disabled.directive';
import { ShadowComponent } from './shadow/shadow.component';
import { timer } from 'rxjs';

export class ParentElement {

    click() {
        setTimeout(_ => this.divTag.nativeElement.focus());
    }


    @ViewChild('divTag') divTag: ElementRef; // DOM element

    shadowComponentRef: ShadowComponent;

    set shadowElement(shadow: ShadowComponent) {
        this.shadowComponentRef = shadow;
        this.updatePosition();
    }

    get shadowElement() {
        return this.shadowComponentRef;
    }

    get shadow(): HTMLElement {
        return this.shadowElement.element.nativeElement;
    }

    public leftoffset: number = 0;

    public topoffset: number = 0;

    private leftStyle: string = "0px";

    private topStyle: string = "0px";

    // @HostBinding('style.left')
    get left(): string {
        return this.leftStyle;

    }

    // @HostBinding('style.top')
    get top(): string {
        return this.topStyle;
    }


    public disabledDirective: DisabledDirective;

    public isHideIfEmpty: boolean = true;


    @Input()
    public value: string;

    @Input()
    focus: boolean = false;

    @Input()
    borderColor: 'warn' | 'primary' | 'accent' | 'text' = 'primary';

    @Input()
    placeholder: string;

    @Input()
    color: 'warn' | 'primary' | 'accent' | 'text' = 'text';


    @Input()
    editable: boolean = true;

    @HostBinding('style.color') get textColorStyle() {
        return this.themeService.getColor(this.color);
    }

    @HostBinding('style.borderColor') get borderColorStyle() {
        return this.themeService.getColor(this.borderColor);
    }

    @Input('hideIfEmpty')
    set hideIfEmpty(value: boolean) {
        this.isHideIfEmpty = value;
    }

    get hideIfEmpty(): boolean {
        return this.isHideIfEmpty;
    }

    currentLeft;
    currentTop;

    constructor(public element: ElementRef, public themeService: ThemeService, changeDetector: ChangeDetectorRef, optDisabled: DisabledDirective) {
        this.disabledDirective = resolve(optDisabled);
        this.disabledDirective.onChange(this.disabledDirective, (newValue) => {
            changeDetector.markForCheck();
            // this.updatePosition();
            if (this.focus && this.divTag) {
                this.click();
            }
        });
    }

    updatePosition() {
        setTimeout(() => {
            if (this.shadowElement) {
                this.leftStyle = this.leftoffset + this.shadow.getBoundingClientRect().left + "px";
                this.topStyle = this.topoffset + this.shadow.getBoundingClientRect().top + "px";
                this.currentLeft = this.leftoffset + this.shadow.getBoundingClientRect().left;
                this.currentTop = this.topoffset + this.shadow.getBoundingClientRect().top;
            }
        });
    }

    get hidden(): boolean {
        return this.disabledDirective.disabled && this.isHideIfEmpty && !this.value;
    }

    get isEditable() {
        return !this.disabledDirective.disabled;
    }

}
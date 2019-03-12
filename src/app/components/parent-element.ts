import { Input, HostBinding, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { TemplateComponent } from './template/template.component';
import { DisabledDirective, resolve } from '../directives/disabled.directive';

export class ParentElement {

    protected disabledDirective: DisabledDirective;

    public isHideIfEmpty: boolean = false;


    public value: string;

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

    constructor(public themeService: ThemeService, changeDetector: ChangeDetectorRef, optDisabled: DisabledDirective) {
        this.disabledDirective = resolve(optDisabled);
        this.disabledDirective.onChange(this.disabledDirective, (newValue) => {
            changeDetector.markForCheck();
        });
    }

    get hidden(): boolean {
        return this.disabledDirective.disabled && this.isHideIfEmpty && !this.value;
    }

    get isEditable() {
        return !this.disabledDirective.disabled;
    }

}
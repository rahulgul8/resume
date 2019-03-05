import { Input, HostBinding } from '@angular/core';
import { ThemeService } from '../services/theme.service';

export class ParentElement {

    public isHideIfEmpty: boolean = false;

    public isEditable: boolean = true;

    @Input()
    textColor: 'warn' | 'primary' | 'accent' | 'text' = 'text';

    @Input()
    placeholder: string;

    @Input()
    color: 'warn' | 'primary' | 'accent' = 'primary';


    @HostBinding('style.color') get textColorStyle() {
        return this.themeService.getColor(this.textColor);
    }

    @HostBinding('style.borderColor') get borderColor() {
        return this.themeService.getColor(this.color);
    }

    @Input()
    set editable(editable: boolean) {
        if (editable) {
            this.isEditable = editable;
        } else {
            this.isEditable = false;
        }
    }

    get editable() {
        return this.isEditable;
    }



    subscription(editable: boolean) {
        this.editable = editable;
    }

    @Input('hideIfEmpty')
    set hideIfEmpty(value: boolean) {
        this.isHideIfEmpty = value;
    }

    get hideIfEmpty(): boolean {
        return this.isHideIfEmpty;
    }

    constructor(public themeService: ThemeService) {
    }

}
import {
    ChangeDetectorRef,
    Directive,
    EventEmitter,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SkipSelf,
    HostListener
} from '@angular/core';

@Directive({
    selector: '[appDisabled]',
})
export class DisabledDirective implements OnChanges {
    @Output() disabledChange: EventEmitter<boolean>;

    @Output() directiveFocus: EventEmitter<any> = new EventEmitter<any>();;
    @Input() appDisabled: boolean = false;
    @Input() disabledStopPropagation: boolean = false;

    disabled: boolean = false;
    private element: HTMLElement;
    private parent: HTMLElement;

    constructor(
        private elementRef: ElementRef,
        @SkipSelf() @Optional() private optParent: DisabledDirective,
        @Optional() private changeDetector: ChangeDetectorRef,
        @Optional() private zone: NgZone,
    ) {
        this.disabledChange = new EventEmitter<boolean>(false);
        if (optParent) {
            optParent.onChange(this, () => this.checkForChanges());
        }
    }

    ngOnInit() {
        this.element = this.elementRef.nativeElement;
        this.parent = this.elementRef.nativeElement.parentElement;
    }

    ngAfterContentInit() {
        this.disabledChange.emit(this.appDisabled);
    }

    @HostListener('focusout', ['$event'])
    focusout(event) {
        if (this.optParent == undefined && !this.element.contains(event.relatedTarget)) {
            this.appDisabled = true;
            this.checkForChanges();
            event.appDisabled = this.appDisabled;
            this.directiveFocus.emit(event);
        }
    }

    @HostListener('click', ['$event'])
    click(event) {
        if (this.optParent == undefined) {
            this.appDisabled = false;
            this.checkForChanges();
            event.appDisabled = this.appDisabled;
        }
    }

    @HostListener('focusin', ['$event'])
    focusin(event) {
        if (this.optParent == undefined) {
            this.appDisabled = false;
            this.checkForChanges();
            event.appDisabled = this.appDisabled;
            this.directiveFocus.emit(event);
        }
    }




    private checkForChanges() {
        setTimeout(() => {
            let newValue = false;

            if (this.disabledStopPropagation || !this.optParent) {
                newValue = !!this.appDisabled;
            } else {
                newValue = !!this.appDisabled || this.optParent.disabled;
            }
            this.updateChildren(newValue);
        }, 0);
    }

    updateChildren(newValue) {
        if (this.zone && newValue != this.disabled) {
            this.zone.run(() => {
                if (this.changeDetector) {
                    this.changeDetector.markForCheck();
                }
                this.disabled = newValue;
                this.disabledChange.emit(newValue);
            });
        }
    }


    ngOnChanges() {
        this.checkForChanges();
    }

    /**
     * Alerts the callback when the disabled state changes
     */
    onChange(directive: DisabledDirective, callback: (opt?: boolean) => void) {
        const result = this.disabledChange.subscribe(callback);
    }
}

const defaultDisabled = new DisabledDirective(null, null, null, null);
export function resolve(optDisabled?: DisabledDirective): DisabledDirective {
    return optDisabled || defaultDisabled;
};

const DISABLED_OPACITY = 0.3;

@Directive({
    selector: '[appDefaultDisabled]',
    host: {
        '[style.opacity]': 'disabled ? ' + DISABLED_OPACITY + ' : undefined',
        '[style.pointerEvents]': 'disabled ? "none" : undefined',
    },
})
export class DefaultDisabledStateDirective {
    disabledDirective: DisabledDirective;
    get disabled(): boolean {
        return this.disabledDirective.disabled;
    }

    constructor(@Optional() optDisabled: DisabledDirective, changeDetector: ChangeDetectorRef) {
        this.disabledDirective = resolve(optDisabled);
    }
}

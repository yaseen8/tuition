import {AbstractControl, ValidatorFn} from "@angular/forms";

export function strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
        let phoneRe = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})');
        const correct = phoneRe.test(control.value);
        return correct ? null: {'strongPassword': {value: control.value}};
    };
}

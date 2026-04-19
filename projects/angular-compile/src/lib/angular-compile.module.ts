import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompileAttribute } from './angular-compile.component';

/**
 * Legacy NgModule wrapper — kept for consumers that still bootstrap via
 * `@NgModule({ imports: [CompileModule] })`. `CompileAttribute` itself is
 * now standalone, so new code can simply `imports: [CompileAttribute]` in
 * a standalone component.
 */
@NgModule({
    imports: [CommonModule, CompileAttribute],
    exports: [CompileAttribute],
})
export class CompileModule {}

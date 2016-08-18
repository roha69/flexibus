/**
 * Created by tbonavia on 18/08/2016.
 */
import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GuiComponent} from "./gui-component";
import {GuiManagerService} from "./gui-manager.service";
import {ExampleGuiComponent} from "./examples/ExampleGuiComponent";

@NgModule({
    imports: [CommonModule],
    declarations: [GuiComponent, ExampleGuiComponent],
    exports: [ExampleGuiComponent]
})
export class GuiModule {
    static forRoot():ModuleWithProviders {
        return {
            ngModule: GuiModule,
            providers: [GuiManagerService]
        };
    }

    static getComponents() {
        return [ExampleGuiComponent];
    }
}
import {Component, ElementRef, AfterViewInit, OnChanges} from "@angular/core";
import {GuiComponent} from "../gui/gui-component";
import * as ol from "openlayers";
import {GuiContextService, GuiContext} from "../gui/gui-context.service";
import {MapService} from "./map.service";

@Component({
    moduleId: module.id,
    selector: 'inner-map',
    templateUrl: 'map.component.html',
    styleUrls: ['map.component.css'],
    providers: [MapService]
})
export class MapComponent extends GuiComponent implements AfterViewInit, OnChanges {
    private height:number;

    private map:ol.Map;

    constructor(private element:ElementRef, private gcs:GuiContextService, private ms:MapService) {
        super();
        this.gcs.guiContext$.subscribe(guiContext => {
            this.onGuiContext(guiContext)
        });
    }

    onGuiContext(guiContext:GuiContext) {
        console.log("map received: " + guiContext.freeContent);
        this.ms.addLocation(guiContext.freeContent);
    }

    onResize(event) {
        this.height = this.element.nativeElement.offsetHeight;
    }

    ngOnChanges() {

    }

    ngAfterViewInit() {
        // Fonctionnement standard : on modifie le bindings dans la boucle. Il faut donc faire le setTimeout pour forcer
        // la relecture : @link https://github.com/angular/angular/issues/6005
        setTimeout(() => {
            this.height = this.element.nativeElement.offsetHeight;

            setTimeout(() => {
                new ol.Map({
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ],
                    target: this.element.nativeElement.querySelector('#mapAnchor'),
                    view: new ol.View({
                        center: [0, 0],
                        zoom: 2
                    })
                });
                this.ms.initLocations();
                this.map.getLayers().push(this.ms.businessLayer);
            });
        });
    }
}
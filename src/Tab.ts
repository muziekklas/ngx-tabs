import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { TabHeading } from './TabHeading';

@Component({
  selector: 'tab',
  template: `
  <ng-content *ngIf="displayMode === 'template' && active"></ng-content>
  <ng-content *ngIf="displayMode === 'style'" [ngClass]="{'hidden':active}"></ng-content>
  `,
  styles: [
    `
  .hidden{
    display:none!important;
    }
    `
  ]
})
export class Tab {
  @ContentChild(TabHeading) heading: TabHeading;

  @Input() title: string;

  /**
   * Gets/Sets the displaymode.
   * When using template, it will use *ngIf, when using Style it will use display:none
   */
  @Input() displayMode: 'template' | 'style' = 'template';

  @Input() active = false;

  @Input() disabled = false;

  get headingTemplate(): TemplateRef<any> {
    return this.heading ? this.heading.templateRef : null;
  }
}

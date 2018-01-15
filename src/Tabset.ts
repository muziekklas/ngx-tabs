import { ContentChildren, Component, QueryList, Input, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { Tab } from './Tab';
import { TabTransclude } from './TabTransclude';
import * as _ from 'lodash';

@Component({
  selector: 'tabset',
  template: `
<div class="tabset">
    <ul class="nav" [ngClass]="{ 'nav-tabs': !pills, 'nav-pills': pills }">
      <li role="presentation" *ngFor="let tab of tabs" [class.active]="tab.active">
        <a (click)="changeActiveTab(tab)" class="btn" [class.disabled]="tab.disabled">
            <span [tabTransclude]="tab.headingTemplate">{{tab.title}}</span>
        </a>        
      </li>
    </ul>
    <div class="tabset-content">
    <ng-content></ng-content>
    </div>
</div>
`
})
export class Tabset implements AfterContentInit {
  @Input() pills: boolean;

  /**
   * Gets/Sets the displaymode.
   * When using template, it will use *ngIf, when using Style it will use display:none
   */
  @Input() displayMode: 'template' | 'style' = 'template';

  @ContentChildren(Tab) tabs: QueryList<Tab>;

  @Output() onSelect = new EventEmitter(false);

  changeActiveTab(tab: Tab) {
    const tabs = this.tabs.toArray();
    _.forEach(tabs, (tab: Tab) => {
      tab.active = false;
      tab.displayMode = this.displayMode;
    });
    tab.active = true;
    this.onSelect.emit(tabs.indexOf(tab));
  }

  ngAfterContentInit() {
    setTimeout(() => {
      // timeout is a monkey patch that fixes issue when tab are used with ngRepeat
      const readTabs = this.tabs.toArray();
      const activeTab = _.find(readTabs, (tab: Tab) => tab.active);
      if (!activeTab && readTabs.length > 0) readTabs[0].active = true;
    });
  }
}

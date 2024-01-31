import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  animations: [
    trigger('showHideBg', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('hide => show', [animate('300ms ease-out')]),
      transition('show => hide', [animate('200ms ease-in')]),
    ]),
    trigger('showHideForm', [
      state(
        'show',
        style({
          opacity: 1,
          transform: 'translateY(0)'
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
          transform: 'translateY(1rem)'
        })
      ),
      transition('hide => show', [animate('300ms ease-out')]),
      transition('show => hide', [animate('200ms ease-in')]),
    ]),
  ],
})
export class AddTaskComponent {
  _isVisible = false;

  focusableElements =
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  modal = document.querySelector<HTMLElement>('#addTaskModal');

  focusableContent = this.modal?.querySelectorAll<HTMLElement>(
    this.focusableElements
  );
  firstFocusableElement = this.focusableContent
    ? this.focusableContent[0]
    : undefined;
  lastFocusableElement = this.focusableContent
    ? this.focusableContent[this.focusableContent.length - 1]
    : this.firstFocusableElement;

  @Input()
  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
    this.isVisibleChange.emit(this.isVisible);

    this.findFocus();

    if (this.isVisible) {
      this.modal?.classList.remove('hidden');
      this.setFocus();
    } else {
      setTimeout(() => {
        this.modal?.classList.add('hidden');
      }, 200);
    }
  }

  findFocus() {
    this.modal = document.querySelector<HTMLElement>('#addTaskModal');
    this.focusableContent = this.modal?.querySelectorAll<HTMLElement>(
      this.focusableElements
    );
    this.firstFocusableElement = this.focusableContent
      ? this.focusableContent[0]
      : undefined;
    this.lastFocusableElement = this.focusableContent
      ? this.focusableContent[this.focusableContent.length - 1]
      : this.firstFocusableElement;
  }

  setFocus() {
    setTimeout(() => {
      this.firstFocusableElement?.focus();
    });
  }

  get isVisible() {
    return this._isVisible;
  }

  @Output()
  isVisibleChange = new EventEmitter<boolean>();

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Tab':
        this.handleTabPress(e);
        return;
      case 'Escape':
        this.isVisible = false;
        return;
    }

    switch (e.code) {
      case 'Tab':
        this.handleTabPress(e);
        return;
      case 'Escape':
        this.isVisible = false;
        return;
    }
  }

  handleTabPress(e: KeyboardEvent) {
    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === this.firstFocusableElement) {
        this.lastFocusableElement?.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === this.lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        this.firstFocusableElement?.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  }
}

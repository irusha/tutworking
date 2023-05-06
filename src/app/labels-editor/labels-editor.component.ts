import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';

@Component({
  selector: 'app-labels-editor',
  templateUrl: './labels-editor.component.html',
  styleUrls: ['./labels-editor.component.css']
})
export class LabelsEditorComponent implements OnInit, AfterViewInit {
  isEditingMode: boolean = false;
  @Input() labels: any;
  @ViewChild('labelChanges') labelChanges: ElementRef | undefined;
  @ViewChild('newBtn') newBtn: ElementRef | undefined;
  @ViewChild('cancel') cancel: ElementRef | undefined;
  @ViewChildren('labelClose') labelItem: any;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  removeLabels(currentLabel: any) {
    let arrayIndex = this.labels.indexOf(currentLabel)
    if (arrayIndex > -1) {
      this.labels.splice(arrayIndex, 1)
    }
  }

  allowEditing() {
    let labelChangeBtn = this.labelChanges?.nativeElement
    let newBtn = this.newBtn?.nativeElement
    let cancelBtn = this.cancel?.nativeElement
    if (!this.isEditingMode) {
      this.isEditingMode = true
      labelChangeBtn.innerText = 'Save'
      labelChangeBtn.classList.remove('btn-primary')
      cancelBtn.style.visibility = 'visible'
      labelChangeBtn.classList.add('btn-success')
      newBtn.style.display = 'flex'
      this.labelItem._results.forEach((currentItem: ElementRef) => {
        let item = currentItem.nativeElement
        item.style.visibility = 'visible'
      })
    } else {
      this.cancelFunction()
    }
  }

  cancelFunction() {
    let labelChangeBtn = this.labelChanges?.nativeElement
    let newBtn = this.newBtn?.nativeElement
    let cancelBtn = this.cancel?.nativeElement

    labelChangeBtn.classList.add('btn-primary')
    cancelBtn.style.visibility = 'hidden'
    labelChangeBtn.innerText = 'Edit'
    this.isEditingMode = false
    labelChangeBtn.classList.remove('btn-success')
    newBtn.style.display = 'none'
    this.labelItem._results.forEach((currentItem: ElementRef) => {
      let item = currentItem.nativeElement
      item.style.visibility = 'hidden'
    })
  }

  newLabel(labelName: string) {

  }
}

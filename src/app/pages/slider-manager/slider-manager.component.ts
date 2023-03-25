import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { select, Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SliderEntry } from 'src/app/core/schemas/slider.schema';
import { SnackbarService } from 'src/app/core/services/snackbar/snackbar.service';
import {
  selectAllSliders,
  selectSliderError,
  selectSliderSaving,
} from 'src/app/core/store/selectors/slider.selector';
import { ConfirmModalComponent } from 'src/app/shared/confirm-modal/confirm-modal.component';
import { environment } from 'src/environments/environment';
import * as sliderAction from '../../core/store/actions/sliders.action';
import { SliderManagerAddComponent } from './slider-manager-add/slider-manager-add.component';

@Component({
  selector: 'app-slider-manager',
  templateUrl: './slider-manager.component.html',
  styleUrls: ['./slider-manager.component.scss'],
})
export class SliderManagerComponent implements OnInit {
  public unsubscribeAll: Subject<boolean>;

  sliders$: Observable<SliderEntry[]>;
  sliders: SliderEntry[];
  saving$: Observable<boolean>;
  loadVariantImages = false;
  count: number = 0;
  isSaving$: Observable<boolean>;
  errorMessage$: Observable<string>;

  serverPublicPath = environment.SERVER_URL + '/public/upload/';

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.store.dispatch(sliderAction.sliderLoadRequested());
    this.sliders$ = this.store.select(selectAllSliders);
    this.sliders$.subscribe((sliders) => {
      if (sliders && sliders.length) {
        this.sliders = JSON.parse(JSON.stringify(sliders));
      }
    });

    this.isSaving$ = this.store.pipe(
      select(selectSliderSaving),
      takeUntil(this.unsubscribeAll)
    );

    this.errorMessage$ = this.store.pipe(
      select(selectSliderError),
      takeUntil(this.unsubscribeAll)
    );
  }

  add() {
    this.dialog.open(SliderManagerAddComponent, {});
  }

  // edit(element) {
  //   const editModal = this.dialog.open(SliderManagerEditComponent, {
  //     data: element,
  //   });
  //   editModal.afterClosed().subscribe(() => {
  //     this.store.dispatch(sliderAction.sliderLoadRequested());
  //   });
  // }

  delete(element) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete this slider?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        this.store.dispatch(
          sliderAction.sliderDeleteRequested({ entry: element })
        );
      }
    });
  }

  check(item): void {
    item.selected = !item.selected;
    this.sliders = JSON.parse(JSON.stringify(this.sliders));
  }

  deleteImages(element) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: {
        action: 'Delete',
        message: 'Are you sure you want to delete those images?',
        icon: 'warning',
        color: 'red',
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res && res.result && res.result === 'confirmed') {
        let newFilenames = [];
        let index = 1;
        element.filenames.forEach((item) => {
          let filename = {
            _id: item._id,
            index,
            selected: false,
            name: item.name,
          };
          if (!item.selected) {
            newFilenames.push(filename);
            index++;
          }
        });
        element.filenames = newFilenames;

        console.log(element);
        
        this.store.dispatch(
          sliderAction.sliderUpdateRequested({
            param: element._id,
            body: element,
          })
        );
      }
    });

    // this.isSaving$.subscribe((saving) => {
    //   if (!saving) {
    //     this.errorMessage$.subscribe((error) => {
    //       if (!error) {
    //         this.store.dispatch(sliderAction.sliderLoadRequested());
    //         dialogRef.close();
    //       }
    //     });
    //   }
    // });
  }

  checkIfNoneSelected(element): any {
    this.sliders.map((item) => {
      if (item._id === element._id) {
        item.filenames.forEach((data) => {
          if (data.selected) this.count++;
        });
      }
    });
    if (this.count == 0) return true;
    else {
      this.count = 0;
      return false;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}

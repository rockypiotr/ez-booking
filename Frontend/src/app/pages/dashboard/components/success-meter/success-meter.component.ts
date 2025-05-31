import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { Divider } from 'primeng/divider';
import { SuccessMeter } from '../../../../@shared/models/success-meter';
import { SuccessMeterService } from '../../../service/success-meter.service';

@Component({
  selector: 'app-success-meter',
  imports: [Card, Divider],
  templateUrl: './success-meter.component.html',
  styleUrl: './success-meter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuccessMeterComponent implements OnInit {
  meters: WritableSignal<SuccessMeter[]> = signal([]);

  private readonly successMeterService = inject(SuccessMeterService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this, this.loadMeters();
  }

  private loadMeters() {
    this.successMeterService
      .getMeters()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((meters) => {
        this.meters.set(meters);
      });
  }
}

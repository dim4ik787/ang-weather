import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IDetailItem } from '../../current-weather.interface';


@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailItemComponent {
  @Input()
  detail!: IDetailItem;
}

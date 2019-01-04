import { Observable } from 'rxjs'
import { map, distinctUntilChanged, publishReplay, refCount } from 'rxjs/operators'
import { FieldViewModel } from './field'
import { FieldValue } from '../support/entities'
import { trice } from '../utils'

export class MiniBoardViewModel {
  readonly fieldsViewModels: FieldViewModel[][]

  constructor(
    values$: Observable<FieldValue[][]>,
    onPress: (pos: number[]) => void,
  ) {
    this.fieldsViewModels = trice(y =>
      trice(x => new FieldViewModel(
        values$.pipe(
          map(values => values[y][x]),
          distinctUntilChanged(),
          publishReplay(1),
          refCount(),
        ),
        () => onPress([y, x]),
      ))
    )
  }
}
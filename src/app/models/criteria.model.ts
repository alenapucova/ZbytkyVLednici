import { NameAndValue } from './name-and-value.model';
import { PortionsService } from '../portions.service';

export class Criteria {
    time: number;
    portions: number = PortionsService.DEFAULT_PORTIONS;
    style: NameAndValue[];
    difficulty: NameAndValue[];
    typeOfMeal: NameAndValue[];
}
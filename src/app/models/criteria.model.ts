import { NameAndValue } from './name-and-value.model';

export class Criteria {
    time: number;
    portions: number;
    style: NameAndValue[];
    difficulty: NameAndValue[];
    typeOfMeal:NameAndValue[];
}
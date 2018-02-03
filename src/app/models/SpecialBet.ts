export class SpecialBet {
    specialsId: number;
    userId: number;
    result: string;

    constructor(specialId: number, userPin: number, result: string) {
        this.specialsId = specialId;
        this.userId = userPin;
        this.result = result;
    }

}

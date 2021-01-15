import {expect, test} from "@jest/globals";
import {getDateText} from "../src/js/utils";

const obj1 = {
    start_date: null,
    end_date: '2020-08-27'
}

const obj2 = {
    start_date: '2020-08-23',
    end_date: '2020-08-26'
}

const obj3 = {
    start_date: '2020-08-23',
    end_date: '2020-09-26'
}

const obj4 = {
    start_date: '2020-08-23',
    end_date: '2021-09-26'
}

test("Checks text with only end_date", () => {
    expect(getDateText(obj1)).toBe("By 26 August 2020");
});

test("Checks dates with same year and same month", () => {
    expect(getDateText(obj2)).toBe("23 - 26 August 2020");
});

test("Checks dates with same year and different month", () => {
    expect(getDateText(obj3)).toBe("23 August - 26 September 2020");
});

test("Checks dates with different year and different month", () => {
    expect(getDateText(obj4)).toBe("23 August 2020 - 26 September 2021");
});
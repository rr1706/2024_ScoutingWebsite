import { formItem } from "./Utils.models";
import { TeamAveragesDTO_2024 } from "../Utils/Utils.models";

export function formatDate(date: Date) {
    if (!date) {
        return null;
    }
    date = new Date(date);
    const format = new Intl.DateTimeFormat("end", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        { value: month }, ,
        { value: day }, ,
        { value: year }
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}

export function dynamicSort(property: any, descending: boolean) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    if (descending) {
        return function (a: any, b: any) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    } else {
        return function (a: any, b: any) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

}

export function convertIdToName(array: any, id: any) {
    return array.filter((x: { id: any; }) => x.id === id)[0]?.name;
}

export function convertStringsToFormItem(strings: string[]) {
    let result: formItem[] = [];

    strings.forEach((string) => {
        let newItem = {
            id: string,
            name: string
        }
        result.push(newItem);
    })
    return result;
}

export function convertNumbersToFormItem(numbers: number[]) {
    let result: formItem[] = [];

    numbers.forEach((number) => {
        let newItem = {
            id: number,
            name: number
        }
        result.push(newItem);
    })
    return result;
}

export function convertBoolToString(bool: boolean | undefined) {
    if (bool === undefined) {
        return undefined
    } else if (bool) {
        return "Yes";
    } else {
        return "No"
    }
}
export function convertStringToBool(string: string | undefined) {
    if (string === undefined) {
        return false;
    } else if (string.toLowerCase() === 'yes') {
        return true;
    } else {
        return false;
    }
}
export function convertStringArrayToNumArray(stringArray: string[]) {
    let numArray: number[] = []

    stringArray.forEach((string) => {
        numArray.push(parseInt(string, 10));
    })

    return numArray;
}

export function convertNumArrayToStringArray(numArray: number[]) {
    let stringArray: string[] = []

    numArray.forEach((number) => {
        stringArray.push(number.toString());
    })

    return stringArray;
}

export function getRank(value: any, allValues: any[], descending: boolean) {
    if (value === null) {
        return undefined;
    }
    if (descending) {
        allValues.sort(function (a, b) { return b - a });
    } else {
        allValues.sort(function (a, b) { return a - b });
    }
    allValues = allValues.filter(x => {
        return x !== null
    })
    return allValues.indexOf(value) + 1;
}

export function getNumberSuccessfulClimbs(team: TeamAveragesDTO_2024) {
    return (team.climbPercent! * team?.numMatches! / 100)
}
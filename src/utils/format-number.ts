import { cloneDeep } from "lodash";

export function formatterDiscount(discount: number) {
    const clonedDiscount = cloneDeep(discount);
    const formatterWithEuro = `${formatterEuro(clonedDiscount)}`;
    const newPercent = formatterWithEuro.substring(0, formatterWithEuro.length - 1);

    return `${newPercent}%`;
}

export function formatterEuro(priceToFormatter: number) {
    // Asegúrate de que el precio sea un número
    if (typeof priceToFormatter !== "number" || isNaN(priceToFormatter)) {
        // throw new Error("El precio debe ser un número válido.");
        return "0,00 €";
    }

    // Redondear el número al segundo decimal
    const roundedPrice = Math.round(priceToFormatter * 100) / 100;

    // Convertir el número redondeado a una cadena con dos decimales
    const priceString = roundedPrice.toFixed(2);

    // Obtener la parte entera y los decimales
    const [integerPart, decimalPart] = priceString.split(".");

    // Si el decimalPart es undefined o vacío, establecerlo como '00'
    const paddedDecimalPart = decimalPart.padEnd(2, "0");

    // Concatenar la parte entera y los decimales
    const formattedPrice = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + paddedDecimalPart;

    return formattedPrice + " €";
}

export function formatterEuroToD3(priceToFormatter: number) {
    // Asegurarse de que el precio sea un número entero
    if (!Number.isInteger(priceToFormatter) && !Number(priceToFormatter)) {
        return "0 €";
    }

    // Convertir el número a una cadena
    const priceString = priceToFormatter.toString();

    // Obtener la parte entera
    const integerPart = priceString;

    // Concatenar la parte entera
    const formattedPrice = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return formattedPrice + " €";
}

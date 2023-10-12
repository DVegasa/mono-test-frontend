/**
 * Замена русских букв на английские
 */
export function normalizePlate(plate) {
  plate = plate?.replace('А', 'A');
  plate = plate?.replace('В', 'B');
  plate = plate?.replace('Е', 'E');
  plate = plate?.replace('К', 'K');
  plate = plate?.replace('М', 'M');
  plate = plate?.replace('Н', 'H');
  plate = plate?.replace('О', 'O');
  plate = plate?.replace('Р', 'P');
  plate = plate?.replace('С', 'C');
  plate = plate?.replace('Т', 'T');
  plate = plate?.replace('У', 'Y');
  plate = plate?.replace('Х', 'X');
  return plate;
}

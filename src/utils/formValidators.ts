export function validatePhoneNumber(value: string): true | string {
  const digitsOnly = value.replace(/[^\d]/g, "");
  const isValid =
    /^(9\d{9}|09\d{9})$/.test(digitsOnly) && !digitsOnly.startsWith("98");

  return (
    isValid ||
    "شماره معتبر نیست. باید با ۹ یا ۰۹ شروع شود و ۱۰ یا ۱۱ رقم داشته باشد."
  );
}
export function validateNationalCode(input: string): true | string {
  const code = input.replace(/[^\d]/g, "");

  if (!/^\d{10}$/.test(code)) {
    return "کد ملی باید ۱۰ رقم باشد.";
  }

  if (/^(\d)\1{9}$/.test(code)) {
    return "کد ملی معتبر نیست.";
  }
  const check = +code[9];
  const sum =
    code
      .split("")
      .slice(0, 9)
      .reduce((acc, num, index) => acc + +num * (10 - index), 0) % 11;

  const isValid =
    (sum < 2 && check === sum) || (sum >= 2 && check === 11 - sum);

  return isValid || "کد ملی معتبر نیست.";
}

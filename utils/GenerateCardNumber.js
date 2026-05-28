exports.GenerateCardNumber = () => {
  const fixedPart = "62198618";

  const randomPart = Math.floor(Math.random() * 100000000)
    .toString()
    .padEnd(8, "0");
  100000000;

  const fullNumber = fixedPart + randomPart;

  return fullNumber;
};

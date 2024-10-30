export const processAmount = (amount?: string, decimals?: number) => {
  if (amount && decimals) {
    const floatAmount = parseFloat(amount);

    if (isNaN(floatAmount)) {
      throw new Error("Invalid amount provided");
    }
    if (amount.length < decimals) {
      const newAmount = BigInt(Math.floor(floatAmount * 10 ** decimals));
      return newAmount.toString(); // Return as a string
    }

    return amount;
  } else {
    return null;
  }
};

export const refineAmount = (amount?: string, decimals?: number) => {
  if (amount && decimals) {
    const floatAmount = parseFloat(amount);

    if (amount.length > decimals) {
      const newAmount = floatAmount / (10 ** decimals);
      return newAmount.toFixed(3).toString();
    }

    return amount;
  } else {
    return null;
  }
};

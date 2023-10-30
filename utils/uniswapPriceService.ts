export const getPrice = (
  inputToken: tokenModal,
  toToken: tokenModal,
  inputAmount: number
) => {};

interface tokenModal {
  name: string;
  address: string;
  chain: number;
}

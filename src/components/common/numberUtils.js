import numeral from 'numeral';

export const formatPrice = price => {
  return numeral(price).format('0.00');
};

/** percentRate should be a number between 0 and 1 */
export const formatPercentage = percentRate => {
  return numeral(percentRate).format('0.00%');
};

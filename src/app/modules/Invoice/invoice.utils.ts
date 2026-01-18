export const calculateDueDate = (
  issueDate: Date,
  paymentTerm: string
): Date => {
  const date = new Date(issueDate);

  const map: Record<string, number> = {
    NET_7: 7,
    NET_15: 15,
    NET_30: 30,
    NET_45: 45,
    NET_60: 60,
  };

  if (map[paymentTerm]) {
    date.setDate(date.getDate() + map[paymentTerm]);
  }

  return date;
};

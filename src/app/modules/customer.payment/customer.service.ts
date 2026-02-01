import axios from "axios";
import { IOrder } from "../order/order,interface";


const baseURL = "https://quickbooks.api.intuit.com/v3/company";

export const createInvoiceQB = async (
  realmId: string,
  token: string,
  order: IOrder,
  qbCustomerId: string
): Promise<string> => {
  const url = `${baseURL}/${realmId}/invoice`;

  const body = {
    CustomerRef: { value: qbCustomerId },
    Line: order.items.map(item => ({
      Amount: item.price * item.quantity,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: { value: "1", name: item.name }
      }
    }))
  };

  const res = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
  });

  return res.data?.Invoice?.Id;
};

export const updateCreditLimitQB = async (
  realmId: string,
  token: string,
  qbCustomerId: string,
  limit: number
): Promise<void> => {
  const getRes = await axios.get(`${baseURL}/${realmId}/customer/${qbCustomerId}`, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
  });

  const syncToken = getRes.data.Customer.SyncToken;

  await axios.post(`${baseURL}/${realmId}/customer?operation=update`, {
    Id: qbCustomerId,
    SyncToken: syncToken,
    CreditLimit: limit
  }, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
  });
};

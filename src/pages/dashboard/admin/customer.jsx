import React from "react";
import axios from "axios";
import { BACKEND_API_URL, getToken } from "src/utils/helper";
import { toast } from "react-toastify";
import { useCustomers, usePayments } from "src/hooks/fetch.data";
import { DataTable } from "src/components/tables/data.table";

export const Customer = () => {
  const { customers, loading, fetchCustomers } = useCustomers();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?"))
      return;

    try {
      const token = getToken();
      await axios.delete(`${BACKEND_API_URL}/customers/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Customer deleted successfully", { position: "top-right" });
      fetchCustomers();
    } catch (err) {
      toast.error("Failed to delete customer", { position: "top-right" });
      console.error(err);
    }
  };

  const customerColumns = [
    { header: "ID", accessor: "CUSTOMERID" },
    { header: "Name", accessor: "NAME" },
    { header: "Phone", accessor: "PHONE" },
    { header: "Email", accessor: "EMAIL" },
    { header: "Address", accessor: "ADDRESS" },
    { header: "Username", accessor: "USERNAME" },
  ];

  return (
    <div className="p-4 bg-darkblue text-white space-y-5">
      <div className="space-y-2">
        <h1 className="text-lg font-bold">Customers</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columns={customerColumns}
            data={customers}
            showDelete={true}
            onDelete={handleDelete}
          />
        )}
      </div>
      <div>
        <PaymentList />
      </div>
    </div>
  );
};

//all payments
export const PaymentList = () => {
  const { payments, loading } = usePayments();

  const columns = [
    { header: "Payment ID", accessor: "PAYMENTID" },
    { header: "Booking ID", accessor: "BOOKINGID" },
    { header: "Payment Date", accessor: "PAYMENTDATE" },
    { header: "Amount", accessor: "AMOUNT" },
    { header: "Method", accessor: "METHOD" },
    { header: "Status", accessor: "STATUS" },
    { header: "Customer ID", accessor: "CUSTOMERID" },
    { header: "Customer Name", accessor: "CUSTOMERNAME" },
  ];

  return (
    <div className="bg-darkblue text-white">
      <h1 className="text-lg font-bold pb-2">Payments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={columns} data={payments} />
      )}
    </div>
  );
};

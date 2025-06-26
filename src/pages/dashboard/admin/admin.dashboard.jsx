import React from "react";
import { DataTable } from "src/components/table/data.table";
import {
  useBookingStaff,
  useCustomers,
  useResponsibilities,
  useStaff,
  useStaffSchedules,
} from "src/hooks/fetch.data";

export const AdminDashboard = () => {
  const { customers, loading: loadingCustomers } = useCustomers();
  const { staffList, loading: loadingStaff } = useStaff();
  const { bookingStaffs, loading: loadingBookingStaffs } = useBookingStaff();
  const { schedules, loading: loadingSchedules } = useStaffSchedules();

  const { responsibilities, loading: loadingResponsibility } =
    useResponsibilities();

  const customerColumns = [
    { header: "ID", accessor: "CUSTOMERID" },
    { header: "Name", accessor: "NAME" },
    { header: "Phone", accessor: "PHONE" },
    { header: "Email", accessor: "EMAIL" },
    { header: "Address", accessor: "ADDRESS" },
    { header: "Username", accessor: "USERNAME" },
  ];

  const staffColumns = [
    { header: "ID", accessor: "STAFFID" },
    { header: "Name", accessor: "NAME" },
    { header: "Phone", accessor: "PHONE" },
    { header: "Email", accessor: "EMAIL" },
    { header: "Role", accessor: "ROLETITLE" },
    { header: "Username", accessor: "USERNAME" },
  ];

  const bookingStaffColumns = [
    { header: "Booking ID", accessor: "BOOKINGID" },
    { header: "Staff ID", accessor: "STAFFID" },
    { header: "Staff Name", accessor: "STAFFNAME" },
  ];

  const scheduleColumns = [
    { header: "Staff", accessor: "STAFFNAME" },
    { header: "Play Area", accessor: "PLAYAREANAME" },
    {
      header: "Date",
      accessor: "SHIFTDATE",
      format: (value) => value.split("T")[0],
    },
    { header: "Time", accessor: "SHIFTTIME" },
  ];

  const resposisibiltyColumns = [
    { header: "ID", accessor: "RESPONSIBILITYID" },
    { header: "Role ID", accessor: "ROLEID" },
    { header: "Role Title", accessor: "ROLETITLE" },
    { header: "Responsibility", accessor: "RESPONSIBILITYTEXT" },
  ];

  return (
    <div className="p-4 min-h-screen text-white space-y-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold mt-8 mb-4">
            Staff Schedules
          </h1>
          {loadingSchedules ? (
            <p>Loading schedules...</p>
          ) : (
            <DataTable columns={scheduleColumns} data={schedules} />
          )}
        </div>

        <div>
          <h1 className="text-xl lg:text-2xl font-bold mt-8 mb-4">
            Assigned Staff to Bookings
          </h1>
          {loadingBookingStaffs ? (
            <p>Loading...</p>
          ) : (
            <DataTable columns={bookingStaffColumns} data={bookingStaffs} />
          )}
        </div>
      </div>
      <h1 className="text-xl lg:text-2xl font-bold mb-4">All Customers</h1>
      {loadingCustomers ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={customerColumns} data={customers} />
      )}

      <h1 className="text-xl lg:text-2xl font-bold mt-8 mb-4">
        All Staff Members
      </h1>
      {loadingStaff ? (
        <p>Loading...</p>
      ) : (
        <DataTable columns={staffColumns} data={staffList} />
      )}
      <h1 className="text-xl lg:text-2xl font-bold mt-8 mb-4">
        Responsibilities
      </h1>
      {loadingResponsibility ? (
        <p>loadingRes ponsibility...</p>
      ) : (
        <DataTable columns={resposisibiltyColumns} data={responsibilities} />
      )}
    </div>
  );
};

import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import { useCustomers } from "src/hooks/fetch.data";
import { useStaff } from "src/hooks/fetch.data";
import { useBookingStaff } from "src/hooks/fetch.data";
import { usePayments } from "src/hooks/fetch.data";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const AdminDashboard = () => {
  const { customers, loading: loadingCustomers } = useCustomers();
  const { staffList, loading: loadingStaff } = useStaff();
  const { bookingStaffs, loading: loadingBookings } = useBookingStaff();
  const { payments, loading: loadingPayments } = usePayments();

  // --- Pie chart data for customers (example: active vs inactive)
  // Simulate active/inactive breakdown or use real data if available
  const customerStatusData = useMemo(() => {
    if (!customers) return null;

    const activeCount = customers.filter((c) => c.isActive).length;
    const inactiveCount = customers.length - activeCount;

    return {
      labels: ["Active Customers", "Inactive Customers"],
      datasets: [
        {
          label: "Customers",
          data: [activeCount, inactiveCount],
          backgroundColor: ["rgba(34,197,94,0.8)", "rgba(147,197,253,0.8)"], // green & blue
          borderWidth: 1,
        },
      ],
    };
  }, [customers]);

  // --- Bar chart data for staff roles count
  const staffRoleData = useMemo(() => {
    if (!staffList) return null;

    // Count number of staff per role
    const roleCounts = staffList.reduce((acc, staff) => {
      const role = staff.ROLETITLE || "Unknown";
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(roleCounts),
      datasets: [
        {
          label: "Number of Staff",
          data: Object.values(roleCounts),
          backgroundColor: "rgba(34,197,94,0.8)", // green bars
        },
      ],
    };
  }, [staffList]);

  // --- Payment status chart (example: success vs failed)
  const paymentStatusData = useMemo(() => {
    if (!payments) return null;

    const successCount = payments.filter((p) => p.status === "success").length;
    const failedCount = payments.filter((p) => p.status === "failed").length;
    const pendingCount = payments.filter((p) => p.status === "pending").length;

    return {
      labels: ["Success", "Failed", "Pending"],
      datasets: [
        {
          label: "Payments",
          data: [successCount, failedCount, pendingCount],
          backgroundColor: [
            "rgba(34,197,94,0.8)", // green
            "rgba(239,68,68,0.8)", // red
            "rgba(251,191,36,0.8)", // yellow
          ],
        },
      ],
    };
  }, [payments]);

  if (loadingCustomers || loadingStaff || loadingBookings || loadingPayments) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-0 min-h-screen text-white mx-auto">
      <h1 className="text-2xl text-center font-bold mb-8">Dashboard Overview</h1>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-darkBlue rounded-lg p-6 shadow-md flex flex-col items-center justify-center min-h-[140px]">
          <FaUsers className="text-green-500 mb-3" size={40} />
          <h2 className="text-lg font-semibold mb-2">Total Customers</h2>
          <p className="text-2xl font-bold">{customers.length}</p>
        </div>

        <div className="bg-darkBlue rounded-lg p-6 shadow-md flex flex-col items-center justify-center min-h-[140px]">
          <FaUserTie className="text-green-500 mb-3" size={40} />
          <h2 className="text-lg font-semibold mb-2">Total Staff</h2>
          <p className="text-2xl font-bold">{staffList.length}</p>
        </div>

        <div className="bg-darkBlue rounded-lg p-6 shadow-md flex flex-col items-center justify-center min-h-[140px]">
          <FaClipboardList className="text-green-500 mb-3" size={40} />
          <h2 className="text-lg font-semibold mb-2">Total Bookings</h2>
          <p className="text-2xl font-bold">{bookingStaffs.length}</p>
        </div>

        <div className="bg-darkBlue rounded-lg p-6 shadow-md flex flex-col items-center justify-center min-h-[140px]">
          <FaMoneyCheckAlt className="text-green-500 mb-3" size={40} />
          <h2 className="text-lg font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold">{payments.length}</p>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-darkBlue p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Customer Status
          </h3>
          {customerStatusData ? (
            <Pie data={customerStatusData} />
          ) : (
            <p>No customer data available</p>
          )}
        </div>

        <div className="bg-darkBlue p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Staff Roles
          </h3>
          {staffRoleData ? (
            <Bar
              data={staffRoleData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
              }}
            />
          ) : (
            <p>No staff data available</p>
          )}
        </div>

        <div className="bg-darkBlue p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Payment Status
          </h3>
          {paymentStatusData ? (
            <Pie data={paymentStatusData} />
          ) : (
            <p>No payment data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

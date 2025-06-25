import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BACKEND_API_URL, getToken } from "src/utils/helper";
import { toast } from "react-toastify";
import {
  usePlayAreas,
  useResponsibilities,
  useRoles,
  useStaff,
  useStaffSchedules,
} from "src/hooks/fetch.data";
import { DataTable } from "src/components/table/data.table";

export const Staff = () => {
  const { staffList, loading, fetchStaff } = useStaff();
  const {
    schedules,
    loading: loadingSchedules,
    fetchSchedules,
  } = useStaffSchedules();
  const {
    responsibilities,
    loading: loadingResponsibility,
    deleteResponsibility,
  } = useResponsibilities();

  //staff
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff?")) return;

    try {
      const token = getToken();
      await axios.delete(`${BACKEND_API_URL}/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Staff deleted successfully", { position: "top-right" });
      fetchStaff();
    } catch (err) {
      toast.error("Failed to delete staff", { position: "top-right" });
      console.error(err);
    }
  };

  const staffColumns = [
    { header: "ID", accessor: "STAFFID" },
    { header: "Name", accessor: "NAME" },
    { header: "Phone", accessor: "PHONE" },
    { header: "Email", accessor: "EMAIL" },
    { header: "Role", accessor: "ROLETITLE" },
    { header: "Username", accessor: "USERNAME" },
  ];

  //sheduls
  const deleteSchedule = async (id) => {
    try {
      const token = getToken();
      await axios.delete(`${BACKEND_API_URL}/staff-schedules/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Schedule deleted");
      fetchSchedules();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };

  const scheduleColumns = [
    { header: "Schedule ID", accessor: "SCHEDULEID" },
    { header: "Staff", accessor: "STAFFNAME" },
    { header: "Play Area", accessor: "PLAYAREANAME" },
    {
      header: "Date",
      accessor: "SHIFTDATE",
      format: (value) => value.split("T")[0],
    },
    { header: "Time", accessor: "SHIFTTIME" },
  ];

  //resposisibilty
  const resposisibiltyColumns = [
    { header: "ID", accessor: "RESPONSIBILITYID" },
    { header: "Role ID", accessor: "ROLEID" },
    { header: "Role Title", accessor: "ROLETITLE" },
    { header: "Responsibility", accessor: "RESPONSIBILITYTEXT" },
  ];

  return (
    <div className="p-4 min-h-screen text-white mx-auto space-y-4">
      <div className="grid lg:grid-cols-3 2xl:grid-cols-4 gap-4">
        <RegisterStaff />
        <BookingAssignForm staffList={staffList} />
        <StaffSchedule />
        <ResponsibilitiesForm />
      </div>

      <div>
        <h2 className="text-xl font-bold">Staff Schedules</h2>
        {loadingSchedules ? (
          <p>Loading schedules...</p>
        ) : (
          <DataTable
            columns={scheduleColumns}
            data={schedules}
            showDelete={true}
            onDelete={deleteSchedule}
          />
        )}
      </div>

      <div>
        <h1 className="text-xl font-bold">All responsibilities</h1>
        {loadingResponsibility ? (
          <p>Loading responsibilities...</p>
        ) : (
          <DataTable
            columns={resposisibiltyColumns}
            data={responsibilities}
            showDelete={true}
            onDelete={deleteResponsibility}
          />
        )}
      </div>

      <div className="space-y-2">
        <h1 className="text-xl font-bold">All Staff Members</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <DataTable
            columns={staffColumns}
            data={staffList}
            showDelete={true}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

//staff registration
const RegisterStaff = () => {
  const { fetchStaff } = useStaff();
  const { roles } = useRoles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const token = getToken();

      // Map role title
      const selectedRole = roles.find(
        (r) => String(r.ROLEID) === String(data.roleId)
      );
      if (!selectedRole) {
        toast.error("Invalid role selected", { position: "top-right" });
        return;
      }

      const payload = {
        ...data,
        roleId: selectedRole.ROLEID,
      };

      // Remove roleTitle from payload as backend expects roleId
      delete payload.roleTitle;

      await axios.post(`${BACKEND_API_URL}/staff/signup`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Staff registered successfully", { position: "top-right" });
      reset(); // clear form
      fetchStaff(); // refresh list
    } catch (error) {
      toast.error("Failed to register staff", { position: "top-right" });
      console.error(error);
    }
  };
  return (
    <div className="bg-darkBlue rounded-md p-4 space-y-4 border lg:max-w-xl">
      <h1 className="text-lg font-bold">Register New Staff</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
          className={`w-full px-3 py-2 rounded border ${
            errors.name ? " border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-400 text-sm">{errors.name.message}</p>
        )}

        <input
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone is required",
            pattern: {
              value: /^[0-9+() -]{7,20}$/,
              message: "Invalid phone number",
            },
          })}
          className={`w-full px-3 py-2 rounded border ${
            errors.phone ? "border-red-500" : ""
          }`}
        />
        {errors.phone && (
          <p className="text-red-400 text-sm">{errors.phone.message}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          className={`w-full px-3 py-2 rounded border  ${
            errors.email ? " border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-red-400 text-sm">{errors.email.message}</p>
        )}

        <select
          {...register("roleId", { required: "Role is required" })}
          className="w-full p-2 rounded border"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option
              key={role.ROLEID}
              value={role.ROLEID}
              className="text-black"
            >
              {role.TITLE}
            </option>
          ))}
        </select>
        {errors.roleTitle && (
          <p className="text-red-400 text-sm">{errors.roleTitle.message}</p>
        )}

        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className={`w-full px-3 py-2 rounded border ${
            errors.username ? " border-red-500" : ""
          }`}
        />
        {errors.username && (
          <p className="text-red-400 text-sm">{errors.username.message}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={`w-full px-3 py-2 rounded border ${
            errors.password ? " border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-red-400 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 w-full rounded disabled:opacity-50 cursor-pointer"
        >
          {isSubmitting ? "Registering..." : "Register Staff"}
        </button>
      </form>
    </div>
  );
};

//staff booking
const BookingAssignForm = ({ staffList }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState("");
  const [staffId, setStaffId] = useState("");

  // Fetch bookings from backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = getToken();
        const res = await axios.get(`${BACKEND_API_URL}/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(res.data.bookings || []);
      } catch (err) {
        toast.error("Failed to load bookings", { position: "top-right" });
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingId || !staffId) {
      toast.error("Please select both booking and staff", {
        position: "top-right",
      });
      return;
    }

    try {
      const token = getToken();
      await axios.post(
        `${BACKEND_API_URL}/booking-staff`,
        { bookingId, staffId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Staff assigned to booking successfully", {
        position: "top-right",
      });
      setBookingId("");
      setStaffId("");
    } catch (err) {
      toast.error("Failed to assign staff to booking", {
        position: "top-right",
      });
      console.error(err);
    }
  };

  return (
    <div className="mb-8  lg:max-w-xl bg-darkBlue rounded-md p-4 space-y-4 border h-full">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Assign Staff to Booking
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-white ">
        <select
          className="w-full px-3 py-2 rounded border"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          disabled={loading}
        >
          <option value="">Select Booking</option>
          {bookings.map((booking) => (
            <option
              key={booking.BOOKINGID}
              value={booking.BOOKINGID}
              className="text-black"
            >
              {`${booking.CUSTOMERNAME} - ${booking.TIMESLOT}`}
            </option>
          ))}
        </select>

        <select
          className="w-full px-3 py-2 rounded border"
          value={staffId}
          onChange={(e) => setStaffId(e.target.value)}
        >
          <option value="" className="text-black">
            Select Staff
          </option>
          {staffList.map((staff) => (
            <option
              key={staff.STAFFID}
              value={staff.STAFFID}
              className="text-black"
            >
              {staff.NAME} ({staff.ROLETITLE})
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full cursor-pointer"
          disabled={loading}
        >
          Assign Staff
        </button>
      </form>
    </div>
  );
};

//shedule add
const StaffSchedule = () => {
  const { staffList } = useStaff();
  const { playAreas } = usePlayAreas();
  const { fetchSchedules } = useStaffSchedules();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        staffId: Number(data.staffId),
        playAreaId: Number(data.playAreaId),
      };

      const token = getToken();
      await axios.post(`${BACKEND_API_URL}/staff-schedules`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Schedule added");
      reset();
      fetchSchedules();
    } catch (err) {
      toast.error("Add schedule failed");
      console.error(err);
    }
  };

  return (
    <div className="p-4 text-white border bg-darkBlue rounded-md lg:max-w-xl h-full">
      <h2 className="text-lg font-bold mb-4">Add Staff Schedule</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <select
            {...register("staffId", { required: "Staff required" })}
            className="w-full p-2 rounded border"
          >
            <option value="">Select Staff</option>
            {staffList.map((s) => (
              <option key={s.STAFFID} value={s.STAFFID} className="text-black">
                {s.NAME}
              </option>
            ))}
          </select>
          {errors.staffId && (
            <p className="text-red-400 text-sm mt-1">
              {errors.staffId.message}
            </p>
          )}
        </div>

        <div>
          <select
            {...register("playAreaId", { required: "Play Area required" })}
            className="w-full p-2 rounded border"
          >
            <option value="">Select Play Area</option>
            {playAreas.map((p) => (
              <option
                key={p.PLAYAREAID}
                value={p.PLAYAREAID}
                className="text-black"
              >
                {p.NAME}
              </option>
            ))}
          </select>
          {errors.playAreaId && (
            <p className="text-red-400 text-sm mt-1">
              {errors.playAreaId.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="date"
            {...register("shiftDate", { required: "Date is required" })}
            className="w-full p-2 rounded border"
          />
          {errors.shiftDate && (
            <p className="text-red-400 text-sm mt-1">
              {errors.shiftDate.message}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Shift Time (e.g. 9AM - 1PM)"
            {...register("shiftTime", { required: "Time is required" })}
            className="w-full p-2 rounded border"
          />
          {errors.shiftTime && (
            <p className="text-red-400 text-sm mt-1">
              {errors.shiftTime.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Add Schedule"}
        </button>
      </form>
    </div>
  );
};

//responsibility
const ResponsibilitiesForm = () => {
  const { addResponsibility } = useResponsibilities();
  const { roles } = useRoles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    await addResponsibility({
      roleId: Number(data.roleId),
      text: data.text,
    });
    reset();
  };

  return (
    <div className="p-4 text-white border bg-darkBlue rounded-md lg:max-w-xl h-full space-y-4">
      <h2 className="text-lg font-bold">Responsibilities</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded">
        <select
          {...register("roleId", { required: "Role is required" })}
          className="w-full p-2 rounded border"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option
              key={role.ROLEID}
              value={role.ROLEID}
              className="text-black"
            >
              {role.TITLE}
            </option>
          ))}
        </select>
        {errors.roleId && (
          <p className="text-red-500">{errors.roleId.message}</p>
        )}

        <textarea
          placeholder="Responsibility Text"
          {...register("text", { required: "Responsibility text is required" })}
          className="w-full p-2 rounded border"
          rows={3}
        />
        {errors.text && <p className="text-red-500">{errors.text.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 hover:bg-green-700 p-2 rounded cursor-pointer"
        >
          {isSubmitting ? "Saving..." : "Add Responsibility"}
        </button>
      </form>
    </div>
  );
};

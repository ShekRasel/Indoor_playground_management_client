import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BACKEND_API_URL, getToken } from "src/utils/helper";
import { toast } from "react-toastify";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    const token = getToken();
    try {
      const res = await axios.get(`${BACKEND_API_URL}/customers/allCustomers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(res.data.customers);
    } catch (err) {
      toast.error("Failed to load customers", { position: "top-right" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return { customers, loading, fetchCustomers };
}

export function useStaff() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStaff = async () => {
    const token = getToken();
    try {
      const res = await axios.get(`${BACKEND_API_URL}/staff/allStaff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStaffList(res.data.staff);
    } catch (err) {
      toast.error("Failed to load staff list", { position: "top-right" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  return { staffList, loading, fetchStaff };
}

export function useBookingStaff() {
  const [bookingStaffs, setBookingStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookingStaffs = async () => {
    const token = getToken();
    try {
      const res = await axios.get(`${BACKEND_API_URL}/booking-staff`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookingStaffs(res.data);
    } catch (err) {
      toast.error("Failed to load assigned staff", { position: "top-right" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingStaffs();
  }, []);

  return { bookingStaffs, loading, fetchBookingStaffs };
}

export function useStaffSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedules = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${BACKEND_API_URL}/staff-schedules`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchedules(res.data);
    } catch (err) {
      toast.error("Failed to fetch schedules");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return { schedules, loading, fetchSchedules };
}

export function usePlayAreas() {
  const [playAreas, setPlayAreas] = useState([]);

  const fetchPlayAreas = async () => {
    try {
      const res = await axios.get(`${BACKEND_API_URL}/playareas`);
      setPlayAreas(res.data);
    } catch (err) {
      toast.error("Failed to load play areas");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPlayAreas();
  }, []);

  return { playAreas };
}

export function useResponsibilities() {
  const [responsibilities, setResponsibilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResponsibilities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_API_URL}/responsibilities`);
      setResponsibilities(res.data);
    } catch (err) {
      toast.error("Failed to load responsibilities");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addResponsibility = async (data) => {
    try {
      const token = getToken();
      await axios.post(`${BACKEND_API_URL}/responsibilities`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Responsibility added");
      fetchResponsibilities();
    } catch (err) {
      toast.error("Failed to add responsibility");
      console.error(err);
    }
  };

  const deleteResponsibility = async (id) => {
    if (!window.confirm("Are you sure to delete this responsibility?")) return;
    try {
      const token = getToken();
      await axios.delete(`${BACKEND_API_URL}/responsibilities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Responsibility deleted");
      fetchResponsibilities();
    } catch (err) {
      toast.error("Failed to delete responsibility");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResponsibilities();
  }, [fetchResponsibilities]);

  return {
    responsibilities,
    loading,
    addResponsibility,
    deleteResponsibility,
    fetchResponsibilities,
  };
}

export const useRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_API_URL}/roles`);
        setRoles(res.data);
      } catch (err) {
        console.error("Failed to load roles", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roles, loading };
};

export const usePayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const res = await axios.get(`${BACKEND_API_URL}/payment`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return { payments, loading, fetchPayments };
};
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SecondaryButton } from "src/components/buttons/secondary.button";
import { BACKEND_API_URL, BACKEND_IMG_URL, getToken } from "src/utils/helper";
import { toast } from "react-toastify";

export const BookedIndoor = () => {
  const [playAreas, setPlayAreas] = useState([]);
  const { slug } = useParams();
  const token = getToken();
  const selectedPlayarea = playAreas.find((playArea) => playArea.NAME === slug);

  const [formData, setFormData] = useState({
    bookingDate: "",
    timeSlot: "",
    children: "",
  });

  const [bookingSuccessData, setBookingSuccessData] = useState(null);
  const [paymentData, setPaymentData] = useState({
    paymentDate: "",
    method: "Bkash",
    status: "Paid",
  });

  useEffect(() => {
    axios
      .get(`${BACKEND_API_URL}/playareas`)
      .then((response) => setPlayAreas(response.data))
      .catch((err) => console.error(err));
  }, []);

  const handleBookingChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const totalAmount = selectedPlayarea.RATEPERHOUR;
    const user = JSON.parse(localStorage.getItem("user"));
    const customerId = user?.id;

    const updatedFormData = {
      ...formData,
      customerId,
      totalAmount,
      playAreaIds: [selectedPlayarea.PLAYAREAID],
    };

    if (token) {
      axios
        .post(`${BACKEND_API_URL}/bookings/create`, updatedFormData)
        .then((response) => {
          const { bookingId, message } = response.data;
          toast.success(`${message}`, {
            position: "top-right",
            autoClose: 3000,
          });
          setBookingSuccessData({
            bookingId,
            amount: totalAmount,
          });
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      toast.warn("Please login first!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const payload = {
      bookingId: bookingSuccessData.bookingId,
      paymentDate: paymentData.paymentDate,
      amount: bookingSuccessData.amount,
      method: paymentData.method,
      status: paymentData.status,
    };

    axios
      .post(`${BACKEND_API_URL}/payment`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        toast.success("Payment successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({ bookingDate: "", timeSlot: "", children: "" });
        setPaymentData({ paymentDate: "", method: "Bkash", status: "Paid" });
        setBookingSuccessData(null); // optional: reset for new booking
      })
      .catch(() => {
        toast.error("Payment failed. Try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <div className="flex flex-col lg:flex-row mt-12 gap-10">
      {/* Play Area Info */}
      <div className="w-full lg:w-1/2">
        {selectedPlayarea && (
          <div className="bg-black rounded-lg">
            <div
              className="h-56 rounded-t-lg w-full bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${BACKEND_IMG_URL}${selectedPlayarea.IMAGEURL})`,
              }}
            />
            <div className="p-4 lg:p-8 space-y-4 text-gray">
              <h1 className="font-semibold text-pink text-xl">
                {selectedPlayarea.NAME}
              </h1>
              <p>
                <span className="font-semibold text-white">Capacity:</span>{" "}
                {selectedPlayarea.CAPACITY} children
              </p>
              <p>
                <span className="font-semibold text-white">Rate/Hour:</span> ৳
                {selectedPlayarea.RATEPERHOUR}
              </p>
              {selectedPlayarea.DISCOUNTRATE > 0 && (
                <p className="text-green-400 font-medium">
                  🎉 {selectedPlayarea.DISCOUNTRATE}% Discount Available!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Booking or Payment Form */}
      <div className="w-full lg:w-1/2">
        {!bookingSuccessData ? (
          // Booking Form
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
            <h2 className="text-2xl font-bold text-pink mb-6 text-center">
              Book a Play Session
            </h2>
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Booking Date
                </label>
                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleBookingChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Time Slot
                </label>
                <select
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleBookingChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  required
                >
                  <option value="">Select a time</option>
                  <option value="10:00-12:00">10:00-12:00</option>
                  <option value="12:00-14:00">12:00-14:00</option>
                  <option value="14:00-16:00">14:00-16:00</option>
                  <option value="16:00-18:00">16:00-18:00</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Number of Children
                </label>
                <input
                  type="number"
                  name="children"
                  min="1"
                  value={formData.children}
                  onChange={handleBookingChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  placeholder="e.g. 3"
                  required
                />
              </div>
              <SecondaryButton type="submit" className="!w-full">
                Book Now
              </SecondaryButton>
            </form>
          </div>
        ) : (
          // Payment Form
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
            <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
              Complete Your Payment
            </h2>
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Date
                </label>
                <input
                  type="date"
                  name="paymentDate"
                  value={paymentData.paymentDate}
                  onChange={handlePaymentChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Payment Method
                </label>
                <select
                  name="method"
                  value={paymentData.method}
                  onChange={handlePaymentChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-pink"
                >
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input
                  type="number"
                  value={bookingSuccessData.amount}
                  disabled
                  className="w-full bg-gray-100 border border-gray-300 rounded-md px-4 py-2"
                />
              </div>
              <SecondaryButton type="submit" className="!w-full">
                Pay Now
              </SecondaryButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

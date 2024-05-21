import { useMutation, useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import { forwardRef, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { API_URL } from "../../config.js";
import "react-datepicker/dist/react-datepicker.css";
import "../../date-picker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function isSomeInvalidDateInRange(bookings, [start, end]) {
  return bookings.some((booking) => {
    const bookingStartDate = new Date(booking.date_start);
    const bookingEndDate = new Date(booking.date_end);
    return (
      (bookingStartDate >= start && bookingStartDate <= end) ||
      (bookingEndDate >= start && bookingEndDate <= end)
    );
  });
}
// Must be an entire component
const CustomInput = forwardRef((props, ref) => {
  return (
    <input {...props} className="px-2 py-3 pt-4 outline-none" ref={ref}></input>
  );
});

CustomInput.displayName = "CustomInput";

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

function CheckInForm({ room, bookings }) {
  console.log({ bookings });
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [showDatePicker, setShowDatePicker] = useState(false);
  const ref = useRef();
  const minDate = addDays(new Date(), 1);
  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1),
  );

  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log({ data });
      const response = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: () => {
      toast("Room booked successfully", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["room", room],
      });
    },
    onError: () => {
      toast("Error booking room-by-hotel-id", { type: "error" });
    },
  });

  useEffect(() => {
    if (mutation.status === "error") {
      setTimeout(() => {
        mutation.reset();
      }, 3000);
    }

    if (mutation.status === "success") {
      setTimeout(() => {
        mutation.reset();
      }, 5000);
    }
  }, [mutation.status]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="grow p-3 min-w-[300px] min-h-[400px]"
      tabIndex="0"
    >
      <div className="flex flex-col border rounded border-black overflow-hidden">
        <div className="flex">
          <div className="w-1/2">
            <DatePicker
              excludeDateIntervals={bookings.map((booking) => {
                return {
                  start: new Date(booking.date_start),
                  end: new Date(booking.date_end),
                };
              })}
              popperClassName={"hidden"}
              selected={startDate}
              customInput={<CustomInput />}
              onFocus={() => {
                setShowDatePicker(true);
              }}
              onChange={(startDate) => {
                if (isSomeInvalidDateInRange(bookings, [startDate, endDate])) {
                  console.log("Invalid date range");
                  return;
                }

                setDateRange(() => [startDate, endDate]);
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          <hr className="h-auto border-l z-20 border-black" />
          <div className="w-1/2">
            <DatePicker
              excludeDateIntervals={bookings.map((booking) => {
                return {
                  start: new Date(booking.date_start),
                  end: booking.date_end,
                };
              })}
              popperClassName={"hidden"}
              selected={endDate}
              customInput={<CustomInput />}
              onFocus={() => {
                setShowDatePicker(true);
              }}
              onChange={(endDate) => {
                if (isSomeInvalidDateInRange(bookings, [startDate, endDate])) {
                  console.log("Invalid date range");
                  return;
                }

                setDateRange(() => [startDate, endDate]);
              }}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
        </div>
        <div
          className={`${showDatePicker ? "border-t border-black" : "hidden"}`}
        >
          <DatePicker
            excludeDateIntervals={bookings.map((booking) => {
              return {
                start: new Date(booking.date_start),
                end: booking.date_end,
              };
            })}
            swapRange
            inline
            monthsShown={2}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            onChange={([start, end]) => {
              if (isSomeInvalidDateInRange(bookings, [start, end])) return;

              setDateRange([start, end]);
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
        <button
          onClick={() => {
            mutation.mutate({
              date_start: startDate.toISOString().slice(0, 10), // YYYY-MM-DD
              date_end: endDate.toISOString().slice(0, 10), // YYYY-MM-DD
              room,
              user: user._id,
            });
            setDateRange([addDays(endDate, 1), addDays(endDate, 1)]);
          }}
          className="border-t bg-red-400 border-black px-2 py-3 flex gap-3 items-center justify-center"
        >
          {mutation.status === "idle" && <span>Reservar</span>}
          {mutation.status === "pending" && (
            <>
              <span>Reservando</span>
              <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
            </>
          )}
          {mutation.status === "success" && (
            <>
              <span>Reservado</span>
              <FontAwesomeIcon className="text-neutral-900" icon={faCheck} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

CheckInForm.propTypes = {
  room: PropTypes.string.isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      date_start: PropTypes.string.isRequired,
      date_end: PropTypes.string.isRequired,
    }),
  ),
};

export default CheckInForm;

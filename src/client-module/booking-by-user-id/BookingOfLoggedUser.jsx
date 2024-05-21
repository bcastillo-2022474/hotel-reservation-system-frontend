import PropTypes from "prop-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_URL } from "../../config.js";
import Navbar from "../../shared/componnents/Navbar.jsx";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function BookingOfLoggedUser() {
  const { user } = useContext(UserContext);

  const {
    data: { bookings } = {},
    isLoading: isLoadingBookings,
    error: errorBookings,
  } = useQuery({
    queryKey: ["booking/by-user", user._id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/booking/by-user/${user._id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const {
    data: takenDatesMap,
    isLoading: isTakenDatesLoading,
    error: errorTakenDates,
  } = useQuery({
    queryKey: ["taken-dates/by-user", user._id],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL}/booking/by-user/${user._id}/rooms/taken-dates`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  const isLoading = isLoadingBookings || isTakenDatesLoading;
  const error = errorBookings || errorTakenDates;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast("Error: " + error.message, { type: "error" });
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-dvh h-1">
      <Navbar></Navbar>
      <section className="flex flex-col gap-3 py-3 px-3">
        <h1 className="text-4xl font-bold">Bookings</h1>
        <div className="w-full grid  grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-3 px-5">
          {bookings.map(({ room, _id, date_start, date_end }) => (
            <div className="flex justify-center" key={_id}>
              <div className="border border-gray-200 rounded-md max-w-[350px]">
                <img
                  src={
                    room.images.find(({ is_main_image }) => is_main_image)
                      .image_url
                  }
                  alt={room.name}
                />
                <div className="px-5 py-3 flex flex-col gap-3">
                  <span>{room.description}</span>
                  <DateEditContainer
                    date_start={date_start}
                    date_end={date_end}
                    taken_dates={takenDatesMap[room._id]}
                    bookingId={_id}
                    userId={user._id}
                  />
                  <Link
                    to={`/invoice/${_id}`}
                    className="border text-center px-3 py-2 rounded border-black outline-none hover:bg-black hover:text-white"
                  >
                    Ver factura
                  </Link>
                  <CancelBooking
                    bookingId={_id}
                    userId={user._id}
                  ></CancelBooking>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookingOfLoggedUser;

function CancelBooking({ bookingId, userId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (bookingId) => {
      const response = await fetch(`${API_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      toast("Reservación cancelada", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: ["booking/by-user", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoices/by-user", userId],
      });
    },
    onError: (error) => {
      toast("Error: " + error.message, { type: "error" });
    },
  });

  useEffect(() => {
    if (!mutation.error) return;

    setTimeout(() => {
      mutation.reset();
    }, 5000);
  }, [mutation.error]);

  return (
    <button
      onClick={() => {
        // avoid clicking twice
        if (mutation.isError || mutation.isPending) return;
        mutation.mutate(bookingId);
      }}
      className="bg-black text-white px-3 py-2 rounded outline-none focus:outline-2 focus:outline-black outline-offset-1"
    >
      <span>
        {mutation.isPending && (
          <>
            <span>Cancelando</span>
            <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
          </>
        )}
        {mutation.isIdle && <span>Cancelar reservación</span>}
        {mutation.isError && "Error"}
      </span>
    </button>
  );
}

CancelBooking.propTypes = {
  bookingId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

function DateEditContainer({
  date_start,
  date_end,
  taken_dates,
  bookingId,
  userId,
}) {
  const [[start, end], setRangeDates] = useState([date_start, date_end]);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  //today and 2 months from now
  const [minDate, maxDate] = [
    new Date(),
    new Date(new Date().setMonth(new Date().getMonth() + 2)),
  ];

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ start, end }) => {
      const response = await fetch(`${API_URL}/booking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ date_start: start, date_end: end }),
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }
      return response.json();
    },
    onSuccess: () => {
      toast("Reservación actualizada", { type: "success" });
      queryClient.invalidateQueries({
        queryKey: ["booking/by-user", userId],
      });

      queryClient.invalidateQueries({
        queryKey: ["invoices/by-booking", bookingId],
      });

      queryClient.invalidateQueries({
        queryKey: ["taken-dates/by-user", userId],
      });
    },
    onError: (error) => {
      toast("Error: " + error.message, { type: "error" });
    },
  });

  useEffect(() => {
    if (mutation.error || mutation.isSuccess) {
      setTimeout(() => {
        if (mutation.error) setRangeDates([date_start, date_end]);
        mutation.reset();
        setShowUpdateButton(false);
      }, 5000);
    }
  }, [mutation.error, mutation.isSuccess]);

  console.log({ taken_dates });

  return (
    <div className="pb-5 flex flex-col gap-3">
      <div className="flex gap-3">
        <div className="w-1/2 border rounded overflow-hidden px-2">
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            excludeDateIntervals={taken_dates.map(({ start, end }) => {
              return {
                start,
                end,
              };
            })}
            selected={start}
            onChange={(date) => {
              if (!showUpdateButton) setShowUpdateButton(true);
              setRangeDates([date, end]);
            }}
          ></DatePicker>
        </div>
        <div className="w-1/2 border rounded overflow-hidden px-2">
          <DatePicker
            minDate={minDate}
            maxDate={maxDate}
            excludeDateIntervals={taken_dates.map(({ start, end }) => {
              return {
                start,
                end,
              };
            })}
            selected={end}
            onChange={(date) => {
              if (!showUpdateButton) setShowUpdateButton(true);
              setRangeDates([start, date]);
            }}
          ></DatePicker>
        </div>
      </div>
      {showUpdateButton && (
        <div className="flex gap-2 w-full">
          {mutation.isIdle && (
            <button
              onClick={() => {
                mutation.mutate({ start, end });
              }}
              className="w-1/2 bg-black text-white px-2 py-1 rounded outline-none focus:outline-2 focus:outline-black outline-offset-1"
            >
              <span>Actualizar</span>
            </button>
          )}
          {mutation.isPending && (
            <button className="w-full flex gap-2 justify-center bg-black text-white px-2 py-1 rounded outline-none focus:outline-2 focus:outline-black outline-offset-1">
              <span>Actualizando</span>
              <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
            </button>
          )}

          {mutation.isError && (
            <button className="w-full bg-black text-white px-2 py-1 rounded outline-none focus:outline-2 focus:outline-black outline-offset-1">
              <span>Error</span>
            </button>
          )}

          {mutation.isIdle && (
            <button
              onClick={() => {
                setRangeDates([date_start, date_end]);
                setShowUpdateButton(false);
                console.log("cancelar update");
              }}
              className="w-1/2 bg-black text-white px-2 py-1 rounded outline-none focus:outline-2 focus:outline-black outline-offset-1"
            >
              <span>Cancelar</span>
            </button>
          )}

          {mutation.isSuccess && (
            <button className="w-full flex justify-center items-center gap-2 bg-black text-white px-2 py-1 rounded outline-none focus:outline-2 focus:outline-black outline-offset-1">
              <span>Actualizado</span>
              <FontAwesomeIcon
                icon={faCheck}
                className="text-white"
              ></FontAwesomeIcon>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

DateEditContainer.propTypes = {
  date_start: PropTypes.string.isRequired,
  date_end: PropTypes.string.isRequired,
  taken_dates: PropTypes.arrayOf(
    PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  ).isRequired,
  bookingId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

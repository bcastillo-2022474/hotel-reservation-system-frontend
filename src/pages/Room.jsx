import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

function Room() {
  const { id } = useParams();

  const {
    data: { room } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/room/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log({ error });
    return <div>Error</div>;
  }

  // sort so image with is_main_image true is first
  const imagesSorted = room.images.toSorted((a, b) => {
    if (a.is_main_image) return -1;
    if (b.is_main_image) return 1;
    return 0;
  });

  console.log({ room });
  return (
    <>
      <main className="flex flex-col h-dvh">
        <Navbar />
        <section className="flex flex-col px-20 py-10 items-center grow">
          <ImageCollage images={imagesSorted} />
          <section className="flex flex-col md:flex-row gap-5 w-full py-5 justify-between ">
            <div className="flex flex-col border">
              <h1 className="text-3xl font-bold">{room.hotel.address}</h1>
              <h1 className="text-2xl font-bold">{room.title}</h1>
              <p className="text-lg">{room.description}</p>
              <p className="text-lg">{room.night_price} kr</p>
            </div>
            <CheckInForm />
          </section>
        </section>
      </main>
    </>
  );
}

export default Room;

// Must be an entire component
const CustomInput = forwardRef((props, ref) => {
  return (
    <input
      {...props}
      type="text"
      className="px-2 py-3 pt-4 outline-none"
      ref={ref}
      onClick={() => {}}
      onFocus={(e) => {
        console.log("focus, ahhhhhh");
        console.log(props.onCustomFocus);
        props.onCustomFocus();
      }}
      onBlur={(e) => {
        console.log("blur, ahhhhhh");
        console.log(props.onCustomBlur);
        props.onCustomBlur();
      }}
    ></input>
  );
});

function CheckInForm() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const [showDatePicker, setShowDatePicker] = useState(false);
  const lastFocusedInput = useRef();
  const shouldFocus = useRef(false);
  const caretPosition = useRef();

  useLayoutEffect(() => {
    console.log({ lastFocusedInput });
  }, [lastFocusedInput.current]);

  useLayoutEffect(() => {
    if (!shouldFocus.current) return;
    shouldFocus.current = false;
    lastFocusedInput.current.focus();
    setTimeout(() => {
      lastFocusedInput.current.setSelectionRange(
        caretPosition.current,
        caretPosition.current,
      );
    }, 0);
  });

  return (
    <div className="border grow p-3 min-w-[300px]">
      <div className="flex flex-col border rounded border-black ">
        <div className="flex">
          <div className="w-1/2">
            <DatePicker
              monthsShown={2}
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              selectsStart
              customInput={
                <CustomInput
                  onCustomFocus={() => {
                    console.log("open");
                    setShowDatePicker(true);
                  }}
                  onCustomBlur={() => {
                    setShowDatePicker(false);
                  }}
                />
              }
              onChange={(startDate) => {
                setDateRange(() => [startDate, endDate]);
                lastFocusedInput.current = document.activeElement;
                if (!lastFocusedInput.current) return;
                caretPosition.current = lastFocusedInput.current.selectionStart;
                shouldFocus.current = true;
              }}
              popperClassName={"hidden"}
            />
          </div>
          <hr className="h-auto border-l z-20 border-black" />
          <div className="w-1/2">
            <DatePicker
              popperClassName={"hidden"}
              monthsShown={2}
              selected={endDate}
              startDate={startDate}
              endDate={endDate}
              selectsEnd
              customInput={
                <CustomInput
                  onCustomFocus={() => {
                    console.log("open");
                    setShowDatePicker(true);
                  }}
                  onCustomBlur={() => {
                    setShowDatePicker(false);
                  }}
                />
              }
              onChange={(endDate) => {
                setDateRange(() => [startDate, endDate]);
                console.log(document.activeElement);
                lastFocusedInput.current = document.activeElement;
                if (!lastFocusedInput.current) return;
                caretPosition.current = lastFocusedInput.current.selectionStart;
                shouldFocus.current = true;
              }}
            />
          </div>
        </div>
        <div className="">
          {/*<DatePicker*/}
          {/*  inline*/}
          {/*  monthsShown={2}*/}
          {/*  startDate={startDate}*/}
          {/*  endDate={endDate}*/}
          {/*  selectsRange*/}
          {/*  onChange={([start, end]) => {*/}
          {/*    setDateRange(() => [start, end]);*/}
          {/*    // get last focused input*/}
          {/*    lastFocusedInput.current = document.activeElement;*/}
          {/*    if (!lastFocusedInput.current) return;*/}
          {/*    caretPosition.current = lastFocusedInput.current.selectionStart;*/}
          {/*    shouldFocus.current = true;*/}
          {/*  }}*/}
          {/*  className={`${showDatePicker ? "" : "hidden"}`}*/}
          {/*/>*/}
        </div>
        <button className="border-t bg-red-400 border-black px-2 py-3">
          Reservar
        </button>
      </div>
    </div>
  );
}

function ImageCollage({ images }) {
  return (
    <div className="grid grid-cols-4 gap-5 rounded-2xl overflow-hidden grid-rows-2 w-full h-full shrink-0 max-w-[1200px]">
      {images.length === 1 && (
        <div className="col-span-4 row-span-2 w-full h-full object-cover">
          <img
            src={images[0].image_url}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}
      {images.length === 2 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length === 3 && (
        <>
          <div className="col-span-2 row-span-2 border ">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length === 4 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[3].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length >= 5 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[3].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border1">
            <img
              src={images[4].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}

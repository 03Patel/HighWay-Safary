import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../api/axios'

interface TimeSlot {
  time: string;
  capacity: number;
  booked: number;
  soldOut?: boolean;
}

interface Slot {
  date: string;
  times: TimeSlot[];
}

interface Experience {
  _id?: string;
  title: string;
  slug: string;
  location: string;
  price: number;
  duration: string;
  description: string;
  image: string;
  slots: Slot[];
}

function Details() {
  const { id } = useParams<{ id: string }>();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);


  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    API.get(`/experiences/${id}`)
      .then((res) => {
        setExperience(res.data);
        setSelectedDate(res.data.slots?.[0]?.date || "");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className='text-center py-20'>Loading ...</div>;
  if (!experience) return <div className='text-center py-20'>Experience not found</div>;

  const subtotal = experience.price * quantity;
  const tax = 59;
  const total = subtotal + tax;
  const selectedSlot = experience.slots.find((s) => s.date === selectedDate);

  return (
    <div className='max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-8'>


      <div className='md:col-span-2 space-y-6'>
        <img
          src={experience.image}
          className='w-full h-72 object-cover rounded-xl'
        />
        <div>
          <h1 className='text-2xl font-semibold'>{experience.title}</h1>
          <p className='text-gray-600 mt-2'>{experience.description}</p>


          <div>
            <h2 className='font-medium mb-2 mt-5'>Choose Date</h2>
            <div className='flex flex-wrap gap-2'>
              {experience.slots.map((slot) => (
                <button
                  key={slot.date}
                  onClick={() => {
                    setSelectedDate(slot.date);
                    setSelectedTime("");
                  }}
                  className={`px-3 py-1.5 border rounded-md text-sm font-medium ${selectedDate === slot.date
                      ? "bg-yellow-400 text-black border-yellow-500"
                      : "bg-white hover:bg-gray-50"
                    }`}
                >
                  {slot.date}
                </button>
              ))}
            </div>
          </div>


          <div>
            <h2 className='font-medium mb-2 mt-5'>Choose Time</h2>
            <div className='flex flex-wrap gap-2'>
              {selectedSlot?.times.map((t) => (
                <button
                  key={t.time}
                  onClick={() => setSelectedTime(t.time)}
                  disabled={t.booked >= t.capacity}
                  className={`px-3 py-1.5 border rounded-md text-sm font-medium ${t.booked >= t.capacity
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedTime === t.time
                        ? "bg-yellow-400 border-yellow-500"
                        : "bg-white hover:bg-yellow-50"
                    }`}
                >
                  {t.time}{" "}
                  {t.booked >= t.capacity
                    ? "Sold Out"
                    : `(${t.capacity - t.booked} left)`}
                </button>
              ))}
            </div>
            <p className='text-xs text-gray-500 mt-2'>
              All time are in IST (GMT +5:30)
            </p>
          </div>


          <div>
            <h2 className='font-medium mb-1 mt-3'>About</h2>
            <input
              type="text"
              className='py-1.5 px-2 w-full rounded-md text-sm border'
              placeholder='Please Enter your specification'
            />
          </div>
        </div>
      </div>


      <div className='border rounded-xl p-5 h-fit bg-white shadow-sm md:col-span-1 sticky top-24'>
        <h2 className='font-medium text-gray-700'>Start at</h2>
        <p className=' text-lg font-semibold mt-1'>₹{experience.price}</p>


        <div className='flex items-center justify-between mt-4'>
          <span className='text-gray-600'>Quantity</span>
          <div className='flex items-center gap-2'>
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className='w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100'
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-100"
            >
              +
            </button>
          </div>
        </div>


        <div className="mt-4 space-y-2 text-gray-700 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxes</span>
            <span>₹{tax}</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>


        <button
          disabled={!selectedTime}
          onClick={() => navigate("/booking", {
            state: {
              experience,
              booking: { date: selectedDate, time: selectedTime, quantity }
            }
          })}
        className={`w-full mt-5 py-2 rounded-md font-medium ${selectedTime
            ? "bg-yellow-400 hover:bg-yellow-500 text-black"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
        Confirm
      </button>
    </div>
    </div >
  );
}

export default Details;

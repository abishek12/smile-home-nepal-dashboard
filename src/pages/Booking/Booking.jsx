import { useGetBookingQuery } from "../../features/booking/bookingApiSlice";

import TableHeader from "../../components/header/table.header";
import BookingTable from "./components/booking.table";

const Booking = () => {
  const { data, isFetching, isSuccess } = useGetBookingQuery({
    page: 1,
    limit: 10,
  });

  const totalBookings = data?.pagination?.totalCount;

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <TableHeader
        title="Booking"
        subtitle="booking"
        totalItem={totalBookings}
        path=""
      />
      <BookingTable
        data={data?.items}
        isFetching={isFetching}
        isSuccess={isSuccess}
        totalBookings={totalBookings}
      />
    </div>
  );
};

export default Booking;

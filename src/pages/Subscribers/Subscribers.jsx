import { useGetSubscribersQuery } from "../../features/subscribers/subscribersApiSlice";

import TableHeader from "../../components/header/table.header";

import SubscribersTable from "./components/subscribers.table";

const Subscribers = () => {
  // const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess } = useGetSubscribersQuery({
    page: 1,
    limit: 10,
  });
  const totalSubscribers = data?.pagination?.totalCount;

  return (
    <div className="space-y-6 animate-fade-in p-6">
      {/* Header */}
      <TableHeader
        title="Subscriber"
        subtitle="subscriber"
        totalItem={totalSubscribers}
        path=""
      />
      <SubscribersTable
        data={data?.items}
        isFetching={isFetching}
        isSuccess={isSuccess}
        totalSubscribers={totalSubscribers}
      />
    </div>
  );
};

export default Subscribers;

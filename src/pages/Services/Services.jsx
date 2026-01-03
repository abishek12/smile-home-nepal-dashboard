import { useGetServicesQuery } from "../../features/services/serviceApiSlice";

import TableHeader from "../../components/header/table.header";

import ServicesTable from "./components/service.table";

const Services = () => {
  // const [page, setPage] = useState(1);
  const { data, isFetching, isSuccess } = useGetServicesQuery({
    page: 1,
    limit: 10,
  });
  const totalServices = data?.pagination?.totalCount;

  return (
    <section className="p-4 md:p-8 min-h-screen bg-neutral-50 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <TableHeader
          title="Service"
          subtitle="service"
          totalItem={totalServices}
          path="/service/create"
        />

        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <ServicesTable
            data={data?.items}
            isFetching={isFetching}
            isSuccess={isSuccess}
            totalServices={totalServices}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;

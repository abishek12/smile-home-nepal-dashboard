import ItemNotFound from "../../../components/not-found/item.not.found";

const SubscribersTable = ({
  data,
  isFetching,
  isSuccess,
  totalSubscribers,
}) => {
  if (isFetching) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="card space-y-4">
      {(!totalSubscribers || totalSubscribers.length === 0) && isSuccess ? (
        <ItemNotFound title="Subscribers" />
      ) : (
        <table className="w-full table-auto text-sm text-center text-neutralGreyDark bg-white shadow">
          <thead className="text-neutralGreyDark border">
            <td className="py-4 px-4 text-left font-medium whitespace-nowrap">
              Email
            </td>
            <td className="py-4 px-4 text-left font-medium whitespace-nowrap">
              Status
            </td>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data?.map((element) => {
              <tr className="py-4 px-4 whitespace-nowrap">
                <td>{element?.email}</td>
                <td>{element?.status}</td>
              </tr>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubscribersTable;

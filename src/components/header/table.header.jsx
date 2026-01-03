import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const TableHeader = ({ totalItem, title, subtitle, path }) => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(path);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-neutral-900">{title}s</h1>
        <p className="text-sm text-neutral-500 font-medium">
          {totalItem ?? 0} {subtitle.toLowerCase()}
          {totalItem !== 1 ? "s" : ""} recorded
        </p>
      </div>
      {path !== "" && (
        <button
          className="btn-primary flex items-center justify-center h-11 px-6 shadow-md shadow-primary-500/20 hover:scale-[1.02] active:scale-95 transition-all text-sm font-semibold"
          onClick={handleBtnClick}
        >
          <Plus className="w-5 h-5 mr-2" />
          Add {title}
        </button>
      )}
    </div>
  );
};

export default TableHeader;

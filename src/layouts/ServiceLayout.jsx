import { Outlet } from "react-router-dom";

import ServiceQuickAction from "../pages/Services/components/service.quick.action";

const ServiceLayout = () => {
  return (
    <>
      <Outlet />
      <ServiceQuickAction />
    </>
  );
};

export default ServiceLayout;

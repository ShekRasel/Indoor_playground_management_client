import { useResponsibilities } from "src/hooks/fetch.data";
import { getUser } from "src/utils/helper";

export const StaffDashboard = () => {
  const { role } = getUser() || {};
  const { responsibilities } = useResponsibilities();

  const taskText =
    responsibilities?.find((res) => res.ROLETITLE === role)
      ?.RESPONSIBILITYTEXT || "No task assign yet.";

  return (
    <div className="text-white place-items-center lg:text-xl">
      <h1>The task one</h1>
      <h2>{taskText}</h2>
    </div>
  );
};

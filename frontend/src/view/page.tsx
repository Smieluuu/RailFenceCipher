import DecryptForm from "../components/UX/DecryptForm/DecryptForm";
import EncryptForm from "../components/UX/EncryptForm/EncryptForm";

const Dashboard = () => {
  return (
    <div className="flex justify-center gap-[200px]">
      <EncryptForm />
      <DecryptForm />
    </div>
  );
};

export default Dashboard;

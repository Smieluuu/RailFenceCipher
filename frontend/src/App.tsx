import Dashboard from "./view/page";

const App = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-300 text-center p-5">
        Front: React-Typescript + Tailwind, Backend: Flask
      </h1>
      <h2 className="text-2xl font-bold text-blue-300 text-center p-2.5">
        Rail Fence Cipher
      </h2>
      <Dashboard />
    </div>
  );
};

export default App;

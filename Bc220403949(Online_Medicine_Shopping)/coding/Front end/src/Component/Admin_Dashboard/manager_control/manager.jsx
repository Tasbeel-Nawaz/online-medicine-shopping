import { useState } from "react";
import Manager_Add from "./manager_add";
import Manager_Edit from "./manager_edit";
import Manager_Delete from "./manager_delete";

export default function CustomerControl() {
  const [activeComponent, setActiveComponent] = useState("add");

  const renderComponent = () => {
    switch (activeComponent) {
      case "add": return <Manager_Add />;
      case "edit": return <Manager_Edit />;
      case "delete": return <Manager_Delete />;
      default: return <Home />;
    }
  };

  return (
    <div className="flex  overflow-hidden bg-gray-100 flex-col md:flex-row">
      <div className="w-full md:w-52 bg-emerald-600 text-white p-4 flex flex-col shrink-0 shadow-2xl">
        <h2 className="text-lg font-bold mb-6 border-b border-emerald-500 pb-2 text-center">
          Admin Panel
        </h2>
        <div className="flex md:block   space-x-2 md:space-x-0 md:space-y-1">
          <button
            onClick={() => setActiveComponent("add")}
            className={`whitespace-nowrap block w-full text-left px-3 py-2 rounded-md text-sm transition ${activeComponent === 'add' ? 'bg-white text-emerald-700 font-bold' : 'hover:bg-emerald-700'}`}
          >
            1. Add Manager
          </button>

          <button
            onClick={() => setActiveComponent("edit")}
            className={`whitespace-nowrap block w-full text-left px-3 py-2 rounded-md text-sm transition ${activeComponent === 'edit' ? 'bg-white text-emerald-700 font-bold' : 'hover:bg-emerald-700'}`}
          >
            2. Edit Details
          </button>

          <button
            onClick={() => setActiveComponent("delete")}
            className={`whitespace-nowrap block w-full text-left px-3 py-2 rounded-md text-sm transition ${activeComponent === 'delete' ? 'bg-white text-emerald-700 font-bold' : 'hover:bg-emerald-700'}`}
          >
            3. Delete
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-hidden  md:p-4 ">
        <div className="w-full max-w-full mx-auto"> 
           {renderComponent()}
        </div>
      </div>

    </div>
  );
}
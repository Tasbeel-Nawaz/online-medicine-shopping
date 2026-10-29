import { useState } from "react";
import Supplier_Add from "./supplier_add";
import Supplier_Edit from "./suppplier_update";
import Supplier_Delete from "./supplier_delete";
import Supplier_details from "./supplier_details";

export default function CustomerControl() {
  const [activeComponent, setActiveComponent] = useState("add");

  const renderComponent = () => {
    switch (activeComponent) {
      case "add": return <Supplier_Add />;
      case "edit": return <Supplier_Edit />;
      case "delete": return <Supplier_Delete />;
      case "suppliers": return <Supplier_details />;
      suppliers
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
            1. Add Supplier Data
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
          <button
            onClick={() => setActiveComponent("suppliers")}
            className={`whitespace-nowrap block w-full text-left px-3 py-2 rounded-md text-sm transition ${activeComponent === 'suppliers' ? 'bg-white text-emerald-700 font-bold' : 'hover:bg-emerald-700'}`}
          >
            4. Suppliers Details
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
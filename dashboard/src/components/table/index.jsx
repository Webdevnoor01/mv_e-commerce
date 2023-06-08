import React from "react";
import { Link } from "react-router-dom";

// utility libraries
import shortid from "shortid";

const Table = ({ tableName, to, thead, tbody }) => {
  return (
    <section className="w-full p-4 rounded-md bg-[#283046] mt-6">
      <div className="flex justify-between items-center  ">
        <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3 ">
          {tableName}
        </h2>
        <Link to={to} className=" font-semibold text-sm text-[#d0d2d6] ">
          View all
        </Link>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-[#d0d2d6]">
          <thead className="text-sm text-[#d2d0d6] uppercase border-b border-slate-700 ">
            <tr>
              {thead.map((thData) => (
                <th key={shortid.generate()} scope="col" className="py-3 px-4">
                  {thData}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbody.map((td) => (
              <tr key={shortid.generate()}>
                {td.map((tdData) => (
                  <td
                    key={shortid.generate()}
                    scope="col"
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    {tdData}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;

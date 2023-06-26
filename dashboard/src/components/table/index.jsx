

import { Link } from "react-router-dom";

// utility libraries
import shortid from "shortid";

const Table = ({ tableName, to, thead, tbodys, isShow, isHeading }) => {
  return (
    <section
      className={`w-full p-4 rounded-md bg-[#283046] ${
        isHeading ? "mt-6" : "mt-0"
      }`}
    >
      {isHeading && (
        <div className="flex justify-between items-center  ">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3 ">
            {tableName}
          </h2>
          <Link to={to} className=" font-semibold text-sm text-[#d0d2d6] ">
            View all
          </Link>
        </div>
      )}

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-[#d0d2d6]">
          {thead && (
            <thead className={`text-sm text-[#d2d0d6] uppercase border-b border-slate-700`}>
              <tr>
                {thead.map((thData) => (
                  <th
                    key={shortid.generate()}
                    scope="col"
                    className="py-3 px-4"
                  >
                    {thData}
                  </th>
                ))}
              </tr>
            </thead>
          )}

          {tbodys && (
            <tbody
              key={shortid.generate()}
              className=" transition-all ease-linear "
            >
              {Object.values(tbodys).map((tbody) => (
                <>
                  <tr key={shortid.generate()}>
                    {tbody.td.map((tdData) => (
                      <td
                        key={shortid.generate()}
                        scope="col"
                        className="py-2 px-4 font-medium whitespace-nowrap"
                      >
                        {tdData}
                      </td>
                    ))}
                  </tr>
                  {tbody.children &&
                    isShow &&
                    Object.values(tbody.children).map((td) => (
                      <tr
                        key={shortid.generate()}
                        className="border-b border-slate-700 bg-slate-800"
                      >
                        {td.map((tdData, i) => (
                          <td
                            key={shortid.generate()}
                            scope="col"
                            className={`py-3 px-4 font-medium whitespace-nowrap ${
                              i === 0 ? "pl-6" : ""
                            } `}
                          >
                            {tdData}
                          </td>
                        ))}
                      </tr>
                    ))}
                </>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </section>
  );
};

export default Table;

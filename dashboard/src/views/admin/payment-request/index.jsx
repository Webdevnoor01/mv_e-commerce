import {forwardRef} from "react";
import {FixedSizeList as List} from "react-window";
// React-icons
import { FaEye  } from "react-icons/fa"
// Components
import Table from "../../../components/table"
import Action from "../../../components/table-action"
import Button from "../../../components/ui/button"


function handleOnWheel ({deltaY}){
  console.log("handleOnWheel", deltaY)
}
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWhell={handleOnWheel} {...props} /> 
))

const Row = ({style, index }) => {
  return (
    <div style={style} className="flex text-sm" >
      <div className="w-[25%] p-2 whitespace-nowrap  text-[#d0d2d6]" > {index +1} </div>
      <div className="w-[25%] p-2 whitespace-nowrap text-[#d0d2d6] " >   #454 </div>
      <div className="w-[25%] p-2 whitespace-nowrap " > 
        <span className="py-[1px] px-[5px] bg-slate-500 text-blue-500 rounded-md text-xs text-[#d0d2d6] " > pending  </span>
      </div>
      <div className="w-[25%] p-2 whitespace-nowrap  text-[#d0d2d6] " > 12 jun 2023 </div>
      <div className="w-[25%] p-2 whitespace-nowrap " > 
        <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm " > confirm </button>
      </div>
    </div>
  )
}

const PaymentRequest = () => {
  const tableOption = {
    thead: ["No", "Amount", "Status", "Date", "Action"],
    tbody: {
      data1: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data2: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data3: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data4: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data5: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data6: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data7: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data8: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data9: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data10: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data11: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data12: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data13: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data14: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data15: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data16: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data17: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data18: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data19: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data20: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data21: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data22: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data23: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data24: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data25: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data26: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data27: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data28: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data29: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
      data30: {
        td: [
          1,
         3000,
          
          <span> Pending </span>,
          <span> 22/07/2013</span>,
          <button className="bg-indigo-500 shadow-lg hover:shadow-indigo-500/50 px-3 py-2 curlor-pointer text-white rounded-sm text-sm" >confirm</button>,
         
        ],
      },
    },
  };
  return (
    <div className="px-2 lg:px-7 pt-5" >
      <div className="w-full p-4 bg-[#283046] rounded-md" >
       <div className="text-xl font-medium pb-5 text-[#d0d2d6] " >Withdrwal requests</div>
        <div className="w-full" >
          <div className="w-ful overflow-y-auto" > 
            <div className="flex item-center bg-[#161d31] uppercase text-sx min-w-[340px] px-[.3rem]  " > 
              <div className="w-[25%] pb-2 text-[#d0d2d6] " >No</div>
              <div className="w-[25%] pb-2 text-[#d0d2d6] " >Amount</div>
              <div className="w-[25%] pb-2 text-[#d0d2d6] " >Status</div>
              <div className="w-[25%] pb-2 text-[#d0d2d6] " >date</div>
              <div className="w-[25%] pb-2 text-[#d0d2d6] " >Action</div>
            </div>
            {
               <List
              height={350}
              className="List"
              itemCount={1000}
              itemSize={35}
              outerElementType={outerElementType}
            >
                 {Row}
            </List>
            }
          </div>
        </div>
      
      </div>
    </div>
  )
}
export default PaymentRequest
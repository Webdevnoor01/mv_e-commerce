/* eslint-disable react/prop-types */
import { FaList } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector(state => state.auth)
  return (
    <div className="bg-[#161d31] fixed top-0 left-0 py-5 px-2 lg:px-7 z-40 w-full ">
      <div className=" ml-0 lg:ml-[16.25rem] rounded-sm h-[4.0625rem] flex justify-between items-center text-[#d0d2d6] bg-[#283046] px-5 transition-all  ">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[2.1875rem] h-[2.1875rem] rounded-sm bg-indigo-500 shadow-indigo-500/50 text-white flex justify-center items-center cursor-pointer lg:hidden "
        >
          <span>
            <FaList />
          </span>
        </div>
        <div className="hidden md:block">
          <input
            className="py-2 px-3 bg-transparent outline-none text-[#d0d2d6] border border-sla focus:border-indigo-500 rounded-md "
            type="text"
            placeholder="type something..."
            name="search"
          />
        </div>
        <div className="flex items-center justify-center gap-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center flex-col text-end ">
                <h2 className="text-sm font-bold  ">{userInfo?.name?.split(' ').slice(0, 2).join(' ')}</h2>
                <span className="text-[0.875rem] font-normal w-full " title={userInfo.name}>
                  {userInfo.role}
                </span>
              </div>
              <img
                className="w-[2.8125rem] h-[2.8125rem] rounded-full over"
                src="http://localhost:3000/images/admin.jpg"
                alt="user logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

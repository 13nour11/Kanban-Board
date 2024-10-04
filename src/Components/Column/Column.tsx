import { useContext } from "react";
import Card from "../Card/Card";
import { MemberContext } from "../../Context/MemberContext";
import { ColumnProps } from "../../interfaces/interfaces";

export default function Column({ status }: ColumnProps) {
  const { numMembersByStatus } = useContext(MemberContext) || {
    memberData: [],
    updateMember: () => {},
    deleteMember: () => {},
    numMembersByStatus: {} as { [key: string]: number },
  };
  return (
    <>
      <div className="h-full">
        <h3 className="text-lg text-white font-semibold my-2">
          <div className="flex justify-center items-center gap-x-3">
            <span>{status}</span>
            <span className="h-[30px] w-[30px] rounded-full flex justify-center items-center bg-yellow-900 ">
              {numMembersByStatus[status] || 0}
            </span>
          </div>
        </h3>
        <div className="max-h-screen overflow-y-scroll border border-teal-300 w-full rounded-lg">
          <div className="  h-full  p-2  ">
            <Card status={status} />
          </div>
        </div>
      </div>
    </>
  );
}

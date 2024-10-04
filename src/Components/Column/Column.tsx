import { useContext } from "react";
import Card from "../Card/Card";
import { MemberContext } from "../../Context/MemberContext";
import { ColumnProps } from "../../interfaces/interfaces";

export default function Column({ status }: ColumnProps) {
  const { numMembersByStatus } = useContext(MemberContext) || {
    memberData: [],
    updateMember: () => {},
    deleteMember: () => {},
    numMembersByStatus: {} as { [key: string]: number }, // Fallback with explicit type
  };
  return (
    <>
      <div className="h-full">
        <h3 className="text-lg text-white font-semibold">
          {status} ({numMembersByStatus[status] || 0})
        </h3>
        <div className="border h-full  p-2 border-teal-300 w-full rounded-lg">
          <Card status={status} />
        </div>
      </div>
    </>
  );
}

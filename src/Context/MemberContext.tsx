import React, { createContext, useState, ReactNode, useEffect } from "react";
import { MemberData, MemberContextType } from "../interfaces/interfaces";

// Create the context
export const MemberContext = createContext<MemberContextType | undefined>(
  undefined
);

interface MemberContextProviderProps {
  children: ReactNode;
}

export default function MemberContextProvider({
  children,
}: MemberContextProviderProps) {
  const [memberData, setMemberData] = useState<MemberData[]>([]);
  const [memberDataForUpdate, setMemberDataForUpdate] = useState<MemberData>();
  const [numMembersByStatus, setNumMembersByStatus] = useState<{
    [key: string]: number;
  }>({});
  const [formShow, setFormShow] = useState<boolean>(true);
  const [boardShow, setBoardShow] = useState<boolean>(false);

  // Load member data from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("members");
    if (storedData) {
      setMemberData(JSON.parse(storedData));
    }
  }, []);

  // Save member data to local storage whenever it changes
  useEffect(() => {
    if (memberData.length > 0) {
      localStorage.setItem("members", JSON.stringify(memberData));
    }
    updateMemberCountByStatus();
  }, [memberData]);

  // Update the count of members by status
  const updateMemberCountByStatus = () => {
    const countByStatus: { [key: string]: number } = {};
    memberData.forEach((member) => {
      countByStatus[member.status] = (countByStatus[member.status] || 0) + 1;
    });
    setNumMembersByStatus(countByStatus);
  };

  const addMember = (member: MemberData) => {
    setMemberData((prevMembersData) => [...prevMembersData, member]);
    setFormShow(false); // Hide the form after adding a member
    setBoardShow(true);
  };

  const updateMember = (id: number, updatedMember: MemberData) => {
    setMemberData((prevMembers) =>
      prevMembers.map((member) => (member.id === id ? updatedMember : member))
    );
    setFormShow(false); // Hide the form after updating a member
    setBoardShow(true);
  };

  const deleteMember = (id: number) => {
    setMemberData((prevMembers) => {
      const data = prevMembers.filter((member) => member.id !== id);
      localStorage.setItem("members", JSON.stringify(data));
      return data;
    });
  };

  const updateMemberStatus = (id: number, newStatus: string) => {
    setMemberData((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id ? { ...member, status: newStatus } : member
      )
    );
  };

  return (
    <MemberContext.Provider
      value={{
        memberData,
        setMemberData,
        addMember,
        updateMember,
        deleteMember,
        updateMemberStatus,
        memberDataForUpdate,
        setMemberDataForUpdate,
        numMembersByStatus,
        formShow,
        setFormShow,
        boardShow,
        setBoardShow,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

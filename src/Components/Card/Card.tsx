import React, { useCallback, useContext } from "react";
import { CardProps, MemberData } from "../../interfaces/interfaces";
import { MemberContext } from "../../Context/MemberContext";
import ButtonCard from "../ButtonCard/ButtonCard";



export default function Card({ status }: CardProps) {
  const {
    memberData,
    deleteMember,
    setMemberDataForUpdate,
    updateMemberStatus,
  } = useContext(MemberContext) || {
    memberData: [],
    updateMember: () => {},
    deleteMember: () => {},
    setMemberDataForUpdate: React.Dispatch<
      React.SetStateAction<MemberData | undefined>
    >,
  };
  const handleUpdateProcess = useCallback(
    (member: MemberData) => {
      setMemberDataForUpdate(member);
    },
    [setMemberDataForUpdate]
  );

  const moveMember = useCallback(
    (id: number, newStatus: string) => {
      if (updateMemberStatus) {
        updateMemberStatus(id, newStatus);
      }
    },
    [updateMemberStatus]
  );
  const handleDeleteMember = useCallback(
    (id: number) => {
      deleteMember(id);
    },
    [deleteMember]
  );

  const buttonConfigs = [
    {
      condition: status !== "Unclaimed",
      text: "Move To Unclaimed",
      color: "bg-pink-500",
      action: (memberId: number) => moveMember(memberId, "Unclaimed"),
    },
    {
      condition: status !== "First Contact",
      text: "Move To First Contact",
      color: "bg-blue-500",
      action: (memberId: number) => moveMember(memberId, "First Contact"),
    },
    {
      condition: status !== "Preparing Work Offer",
      text: "Move To Preparing Work Offer",
      color: "bg-slate-500",
      action: (memberId: number) =>
        moveMember(memberId, "Preparing Work Offer"),
    },
    {
      condition: status !== "Send to Therapist",
      text: "Move To Send to Therapist",
      color: "bg-lime-500",
      action: (memberId: number) => moveMember(memberId, "Send to Therapist"),
    },
  ];

  // Filter and render members based on the status prop
  return (
    <div>
      {memberData
        .filter((member) => member.status === status)
        .map((member, index) => (
          <div
            key={index}
            className="bg-white text-black text-start mb-2 p-2 rounded h-full w-full"
          >
            <div className="w-full">
              <div className="flex justify-between items-center w-full">
                <h3 className="font-semibold">
                  {member.title} {member.name}
                </h3>
                <p>{member.age}</p>
              </div>
              <p className="w-full">{member.email}</p>
              <p className="w-full">{member.phone}</p>

              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-6">
                  <ButtonCard
                    text="Edit"
                    color="bg-yellow-500"
                    onClick={() => handleUpdateProcess(member)}
                  />
                </div>
                <div className="col-span-6">
                  <ButtonCard
                    text="Delete"
                    color="bg-red-600"
                    onClick={() => handleDeleteMember(member.id)}
                  />
                </div>

                {/* Render dynamic buttons based on buttonConfigs */}
                {buttonConfigs.map(
                  (buttonConfig, idx) =>
                    buttonConfig.condition && (
                      <div className="col-span-12" key={idx}>
                        <ButtonCard
                          text={buttonConfig.text}
                          color={buttonConfig.color}
                          onClick={() => buttonConfig.action(member.id)}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

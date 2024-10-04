import Column from "../Column/Column";
import { useContext, useMemo, useCallback } from "react";
import { MemberContext } from "../../Context/MemberContext";

export default function KanbanBoardSection() {
  const { setFormShow, setBoardShow, boardShow } = useContext(
    MemberContext
  ) || {
    setFormShow: () => {},
    boardShow: false,
    setBoardShow: () => {},
  };

  // Memoize the static status data
  const allStatus = useMemo(
    () => [
      { id: 1, state: "Unclaimed" },
      { id: 2, state: "First Contact" },
      { id: 3, state: "Preparing Work Offer" },
      { id: 4, state: "Send to Therapist" },
    ],
    []
  );

  // Memoize the function to set form visibility
  const handleNewMemberClick = useCallback(() => {
    setFormShow(true);
    setBoardShow(false);
  }, [setFormShow, setBoardShow]);

  if (!boardShow) {
    return null; // Hide the board when boardShow is false
  }

  return (
    <section className="py-2 w-full text-center h-full mt-5">
      <header>
        <h2 className="font-semibold md:text-4xl text-center py-1 text-teal-300 my-5">
          Kanban Board
        </h2>
      </header>
      <div className="flex justify-center items-center ">
        <article className="grid grid-cols-12 gap-x-2 gap-y-5">
          {allStatus.map((stat) => (
            <div className="col-span-12 md:col-span-3 h-full" key={stat.id}>
              <Column status={stat.state} />
            </div>
          ))}
          <div className="col-span-12 mt-10">
            <button
              onClick={handleNewMemberClick}
              className="btnStyle p-2 rounded w-full max-w-lg "
            >
              New Member
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}

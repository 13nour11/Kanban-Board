import FormSection from "./Components/FormSection/FormSection.js";
import KanbanBoardSection from "./Components/KanbanBoardSection/KanbanBoardSection.js";
import MemberContextProvider from "./Context/MemberContext.js";

function App() {
  return (
    <MemberContextProvider>
      <div className="  min-h-screen p-5 bg-teal-800">
        <FormSection />
        <KanbanBoardSection />
      </div>
    </MemberContextProvider>
  );
}

export default App;

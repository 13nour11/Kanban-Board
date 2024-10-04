// Define the type for a single member
export interface MemberData {
  id: number;
  name: string;
  phone: string;
  email: string;
  age: number;
  title: string;
  status: string;
}

// Define the type for the context value
export interface MemberContextType {
  memberData: MemberData[];
  setMemberData: React.Dispatch<React.SetStateAction<MemberData[]>>;
  addMember: (member: MemberData) => void;
  updateMember: (id: number, updatedMember: MemberData) => void;
  deleteMember: (id: number) => void;
  updateMemberStatus: (id: number, newStatus: string) => void;
  memberDataForUpdate: MemberData | undefined;
  setMemberDataForUpdate: React.Dispatch<
    React.SetStateAction<MemberData | undefined>
  >;
  numMembersByStatus: { [key: string]: number };
  formShow:boolean,
  setFormShow: React.Dispatch<React.SetStateAction<boolean>>;
  boardShow:boolean,
  setBoardShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface FormValues {
  title: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  status: string;
}

export interface Status {
  id: number;
  state: string;
}

export interface Inputs{
  id:number;
  label:string;
  name:string;
  type:string;
}

export interface ButtonProps {
  text: string;
  color: string;
  onClick: () => void;
}

// Define the type for props
export interface CardProps {
  status: string;
}

// Define props type for Column
export interface ColumnProps {
  status: string;
}
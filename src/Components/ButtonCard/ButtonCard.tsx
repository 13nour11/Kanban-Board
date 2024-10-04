import { ButtonProps } from "../../interfaces/interfaces";

export default function ButtonCard({ text, color, onClick }: ButtonProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`p-1 text-white rounded w-full ${color}`}
      >
        {text}
      </button>
    </>
  );
}

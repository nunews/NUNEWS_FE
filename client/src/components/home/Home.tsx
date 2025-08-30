import { FiSearch } from "react-icons/fi";
import { IconButton } from "../ui/IconButton";
import { TextButton } from "../ui/TextButton";
export default function Home() {
  return (
    <>
      <h1>Home Component</h1>
      <div className="w-[100px] p-20 flex flex-col gap-10">
        <IconButton
          icon={FiSearch}
          size={20}
          color="#555"
          className="hover:bg-zinc-100 w-10 h-10"
        />
        <div className="w-20">
          <TextButton>테스트</TextButton>
        </div>
      </div>
    </>
  );
}

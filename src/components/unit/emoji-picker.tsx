"use client";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

type Props = {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
};

const EmojiPicker: React.FC<Props> = ({ children, getValue }) => {
  const router = useRouter();
  const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });
  const pickerHandler = (selectedEmoji: any) => {
    if (getValue) getValue(selectedEmoji.emoji);
  };
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">{children}</PopoverTrigger>
      <PopoverContent className="p-0 border-none w-80">
        <Picker
          onEmojiClick={pickerHandler}
          lazyLoadEmojis
          searchDisabled
          height={"20rem"}
          width={"100%"}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;

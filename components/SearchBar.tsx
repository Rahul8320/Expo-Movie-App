import { icons } from "@/constants/icons";
import { View, Image, TextInput, InputModeOptions } from "react-native";

type ISearchBarProps = {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  inputMode?: InputModeOptions;
  onPress?: () => void;
};

export default function SearchBar({
  placeholder,
  value,
  onChangeText,
  inputMode,
  onPress,
}: ISearchBarProps) {
  const defaultInputMode = inputMode ?? "text";

  return (
    <View className="flex-row items-center bg-dark-200 rounded-full py-4 px-5">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor="#ab8bff"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#a8b5db"
        inputMode={defaultInputMode}
      />
    </View>
  );
}

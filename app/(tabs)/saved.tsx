import { icons } from "@/constants/icons";
import { View, Text, Image } from "react-native";

export default function Saved() {
  return (
    <View className="flex-1 bg-primary px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.save} className="size-10" tintColor="#fff" />
        <Text className="text-base text-gray-500">Saved</Text>
      </View>
    </View>
  );
}

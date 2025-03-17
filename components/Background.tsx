import { images } from "@/constants/images";
import { View, Image } from "react-native";

export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      {children}
    </View>
  );
}

import { useLayoutEffect, useState } from "react";
import { Alert } from "react-native";
import { Flex } from "native-base";

import { useAppNavigation } from "../hooks/navigationHooks";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { addBox } from "../app/mainSlice";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../db/firebase";

import CustomInput from "../components/UI/CustomInput";
import CustomButton from "../components/UI/CustomButton";

const ManageDataScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const navigation = useAppNavigation();
  const route = useRoute<RouteProp<NavParams, "ManageDataScreen">>();
  const paramType = route.params.type;

  const userId = useAppSelector((state) => state.userId);
  const boxesArr = useAppSelector((state) => state.boxData);

  const [boxName, setBoxName] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Add ${paramType}` });
  }, []);

  async function addBoxHandler() {
    if (boxName) {
      const boxPos = boxesArr.length + 1;
      await setDoc(doc(db, "users", userId, "boxes", `Box ${boxPos}`), {
        name: boxName,
      });

      dispatch(addBox(boxName));

      navigation.goBack();
    } else if (!boxName) {
      Alert.alert("Please add a box name");
    }
  }

  return (
    <Flex bg="white" flex={1} p={5}>
      {paramType === "box" && (
        <>
          <CustomInput
            label="Box name"
            autoCapitalize="sentences"
            type="default"
            onChangeText={setBoxName}
            value={boxName}
          />
          <CustomButton title="Add box" onPress={addBoxHandler} />
        </>
      )}
    </Flex>
  );
};

export default ManageDataScreen;

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "../utilities/NewsContext";

const Add = (props) => {
  const [data, setData] = useState([]);
  const { getCate } = useContext(NewsContext);
  const [refresh, setRefresh] = useState(false);

  const refreshData = async () => {
    setRefresh(true);
    const result = await getCate();
    console.log("+>>>>>>>>>>>>", result);
    setData(result);
    setRefresh(false);
  };
  useEffect(() => {
    const getData = async () => {
      const result = await getCate();
      console.log("data response:", result);
      setData(result);
    }
    getData();
    return () => {

    }
  },[])
  const renderItem = ({item}) => {
    const {_id,name} = item;

    return (
      <Pressable
        //onPress={() => navigation.navigate('Detail', {id: _id})}
        style={styles.card}
        >
       <Text id={{_id}} style={styles.title}>{name}</Text>
      </Pressable>
    );
  };

  return (
    <FlatList
    removeClippedSubviews = {true}
    data={data}
    renderItem={renderItem}
    keyExtractor={item => item._id}
    showsVerticalScrollIndicator={false} // ẩn thanh cuộn
    refreshing = {refresh}
    onRefresh={refreshData}
  />
  );
};

export default Add;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 3,
    borderBottomWidth:1,
    margin: 10,
    borderBottomColor: 'black',
    borderRadius: 5,
    backgroundColor: '#dddddd'
  },
  title:{
    fontSize:20,
    color: 'black'
  }
});

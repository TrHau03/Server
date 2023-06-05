import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
  FlatList,
  Select,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { NewsContext } from "../utilities/NewsContext";

const Add = (props) => {
  const {navigation} = props; 
  const [data, setData] = useState([]);
  const { getCate } = useContext(NewsContext);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const getData = async () => {
      const result = await getCate();
      console.log("data response:", result);
      setData(result);
    }
    getData();
    return () => {

    }
  }, [])
  const renderItem = ({ item }) => {
    const { _id, name } = item;

    return (

      <Pressable
        onPress={() => navigation.navigate('DetailCate', {id: _id})}
        style={styles.card}
      >
        <Text id={{ _id }} style={styles.title}>{name}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.bg}>
      <FlatList
        removeClippedSubviews={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false} // ẩn thanh cuộn
      />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    padding: 3,
    borderBottomWidth: 1,
    margin: 10,
    borderBottomColor: 'black',
    borderRadius: 5,
    backgroundColor: '#dddddd',
    width: '100%'

  },
  title: {
    fontSize: 25,
    color: 'black'
  },
  bg:{
    alignItems:'center',
    width: '100%'
  }
});

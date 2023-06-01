import { StyleSheet, Text, View, FlatList,Pressable,Image } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { NewsContext } from '../utilities/NewsContext';

const Demo = (props) => {
    const { id } = props?.route?.params;
    console.log(id);
    const { getDataByCate } = useContext(NewsContext);
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getDataByCate(id);
            console.log("data response:", result);
            setData(result);
        }
        id && fetchData();
        return () => {

        }
    }, [id])
    const renderItem = ({ item }) => {
        const { _id, author,title,category } = item;
        return (
    
            <Pressable
            onPress={() => navigation.navigate('Detail', {id: _id})}
            style={homeStyles.card}>
    
            <View style={homeStyles.information}>
              <Text style={homeStyles.title}>{author}</Text>
              <View style={homeStyles.bottom}>
                <View style={homeStyles.left}>
                  
                  <Text style={homeStyles.channel}>Quantity: {category.name}</Text>
                </View>
                
              </View>
            </View>
          </Pressable>
        );
      };
    return (
        <View>
            <FlatList
                removeClippedSubviews={true}
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false} // ẩn thanh cuộn
            />
        </View>
    )
}

export default Demo

const homeStyles = StyleSheet.create({
    textTrending: {
      marginTop: 10,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 24,
      letterSpacing: 0.12,
      color: '#000000',
    },
    textSeeall: {
      position: 'absolute',
      right: 0,
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 21,
      letterSpacing: 0.12,
    },
    time: {
      fontWeight: '400',
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: 0.12,
      color: '#4e4b66',
    },
  
    channel: {
      fontWeight: '600',
      fontSize: 13,
      lineHeight: 20,
      letterSpacing: 0.12,
      color: '#4e4b66',
    },
    icon: {
      alignItems: 'center',
      marginRight: 4,
    },
    right: {
      marginLeft: 9.17,
      alignItems: 'center',
      flexDirection: 'row',
    },
    left: {
      marginTop: 2,
      alignItems: 'center',
      flexDirection: 'row',
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    title: {
      fontWeight: '400',
      fontSize: 16,
      lineHeight: 24,
      color: '#000',
    },
    category: {
      fontWeight: '400',
      fontSize: 13,
      lineHeight: 20,
      color: '#4e4b66',
    },
    information: {
      flex: 1,
      height: 86,
      marginLeft: 5,
    },
    image: {
      width: 86,
      height: 86,
      borderRadius: 6,
      marginRight: 4,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      padding: 8,
    },
    container: {
      //flex: 1,
      backgroundColor: '#fff',
      padding: 24,
    },
  });
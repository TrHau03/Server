import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {NewsContext} from '../utilities/NewsContext';

const Home = props => {
  const {navigation} = props;
  const {getNews} = useContext(NewsContext);
  const [data, setData] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const refreshData = async () => {
    setRefresh(true);
    const result = await getNews();
    console.log("+>>>>>>>>>>>>", result);
    setData(result);
    setRefresh(false);
  };
  useEffect(() => {
    const getData = async () => {
      const result = await getNews();
      console.log("userEffect",result);
      setData(result);
    };
    getData();
    return () => {};
  }, []);
  const renderItem = ({item}) => {
    const {_id,author,content,quantity,image,category} = item;

    return (
      <Pressable
        onPress={() => navigation.navigate('Detail', {id: _id})}
        style={homeStyles.card}>
        <Image source={{uri: image}} style={homeStyles.image} />

        <View style={homeStyles.information}>
          <Text style={homeStyles.title}>{author}</Text>
          <View style={homeStyles.bottom}>
            <View style={homeStyles.left}>
              <Image
                style={homeStyles.icon}
                source={require('../../../../../src/media/images/Ellipse.png')}
              />
              <Text style={homeStyles.channel}>Quantity: {category.name}</Text>
            </View>
            
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={homeStyles.container}>
      <Image source={require('../../../../../src/media/images/appicon.png')} />
      <View style={homeStyles.text1}>
        <Text style={homeStyles.textTrending}>Trending</Text>
        <Text style={homeStyles.textSeeall}>See all</Text>
      </View>
      <FlatList
        removeClippedSubviews = {true}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false} // ẩn thanh cuộn
        refreshing = {refresh}
        onRefresh={refreshData}
      />
    </View>
  );
};

export default Home;

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
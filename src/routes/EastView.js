import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {scale} from 'react-native-size-matters';

const EastView = () => {
  const navigation = useNavigation();
  const attractions = useSelector(state => state.attractions.attractions);

  // 篩選符合的地區
  const filteredAttractions = attractions.filter(item =>
    ['花蓮縣', '臺東縣'].includes(item.addresses?.[0]?.cityName),
  );

  return (
    <LinearGradient
      colors={['#70F9AC', '#FFFA6A']} // 45度漸層
      start={{x: 1, y: 1}}
      end={{x: 0, y: 0}}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {filteredAttractions.length > 0 ? (
          filteredAttractions.map(attraction => (
            <TouchableOpacity
              key={attraction.caseId}
              style={styles.card}
              onPress={() => navigation.navigate('Detail', {data: attraction})}>
              <Image
                source={{uri: attraction.representImage?.original}}
                style={styles.image}
                onError={() => console.log('圖片加載錯誤')}
              />
              <View style={styles.textContainer}>
                <Text style={styles.attractionName}>{attraction.caseName}</Text>
                <Text style={styles.city}>
                  {attraction.addresses?.[0]?.cityName}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noData}>目前無景點資訊</Text>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  scrollContainer: {
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    width: '95%',
    borderRadius: 25,
    marginBottom: 17,
    overflow: 'hidden',
    elevation: 3,
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: scale(200),
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 11,
  },
  attractionName: {
    fontSize: 22,
    fontFamily: 'Roboto-Bold',
    color: '#333',
    textAlign: 'center',
  },
  city: {
    fontSize: 17,
    color: '#777',
    marginTop: 4,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  noData: {
    fontSize: 16,
    color: '#999',
    marginTop: 20,
    textAlign: 'center',
  },
});
export default EastView;

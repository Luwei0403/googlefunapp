import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import regionData from '../../assets/data/regin.json';
import {scale} from 'react-native-size-matters';

const Filter = () => {
  const navigation = useNavigation();

  // 定義區域與對應的路由
  const regionRoutes = {
    北部地區: 'NorthView',
    中部地區: 'WestView',
    南部地區: 'SouthView',
    東部地區: 'EastView',
    離島地區: 'IslandView',
  };

  return (
    <ImageBackground
      source={require('../../assets/png/background3.png')}
      style={styles.background}
      resizeMode="cover">
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>台灣景點地區</Text>
        {regionData.area_type.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.row}
            onPress={() => navigation.navigate(regionRoutes[item.name])}>
            <View style={styles.textContainer}>
              <LinearGradient
                colors={['#FFD950', '#FF5ACD']}
                start={{x: 0, y: 0}} //左上   x: 1, y: 0:右上
                end={{x: 0, y: 1}} //左下   x: 1, y: 1:右下
                style={styles.gradientBar}
              />
              <Text style={styles.text}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 35,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  textContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBar: {
    width: scale(175),
    height: scale(60),
    borderRadius: 20,
  },
  text: {
    position: 'absolute',
    fontSize: 23,
    fontFamily: 'Roboto-ExtraBold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: {width: 1.5, height: 1.5},
    textShadowRadius: 3,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 13,
    color: '#333',
  },
});

export default Filter;

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  Linking,
  Pressable,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {addFavorite} from '../../src/reducers/myfavReducer';

export const Detail = () => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const route = useRoute();
  const locate = route?.params?.data; //可能是從Home的marker傳遞data，也可以從地區篩選傳遞的data

  const handleTriggerNavigate = () => {
    if (!locate || !locate.latitude || !locate.longitude) {
      Alert.alert('錯誤', '無法獲取位置信息');
      return;
    }
    const scheme = Platform.select({
      android: 'geo:0,0?q=',
    });
    const latLng = `${locate.latitude},${locate.longitude}`;
    const label = locate.caseName;
    const url = `${scheme}${latLng}(${label})`;

    Linking.openURL(url).catch(err => console.log('導航錯誤:', err));
  };

  const handleAddToMyFavorite = marker => {
    const isAlreadyFavorite = favorites.some(
      //item是favorites陣列中每個景點加入我的最愛的景點
      item =>
        item.caseName === marker.caseName && //item內的條件全部符合時(&&)，some()才會回傳 true
        item.latitude === marker.latitude &&
        item.longitude === marker.longitude,
    );
    if (isAlreadyFavorite) {
      Alert.alert('提醒', '此景點已在我的最愛中');
      return;
    }
    dispatch(addFavorite(marker)); // Redux 會自動更新 `state`
    Alert.alert('成功', '景點已加入我的最愛');
  };

  return (
    <View style={styles.container}>
      {/* 圖片區塊 */}
      <View style={styles.imagecontainer}>
        <Image
          style={styles.image}
          source={{uri: locate.representImage.original}}
          onError={() => console.log('圖片載入失敗')}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{locate.caseName}</Text>

        {/* 地址 */}
        <View style={styles.item}>
          <Image
            source={require('../../assets/png/location.png')}
            style={styles.icon}
          />
          <Text style={styles.texttitle}>位置: </Text>
          <Text style={styles.cityName}>
            {locate.addresses?.[0]?.cityName || '地址未提供'}
          </Text>
          <Text style={styles.textlong}>
            {locate.addresses?.[0]?.address || '地址未提供'}
          </Text>
        </View>

        {/* 景點描述 */}
        <View style={styles.item}>
          <Image
            source={require('../../assets/png/application.png')}
            style={styles.icon}
          />
          <Text style={styles.texttitle}>景點描述:</Text>
          <Text style={styles.textlong}>{locate.briefDescribe}</Text>
        </View>

        {/* 特殊價值 (如果有的話) */}
        {locate.specialValue && (
          <View style={styles.item}>
            <Image
              source={require('../../assets/png/ticket.png')}
              style={styles.icon}
            />
            <Text style={styles.texttitle}>特殊價值: </Text>
            <Text style={styles.textlong}>{locate.specialValue}</Text>
          </View>
        )}

        {/* 按鈕區塊 */}
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.favaction}
            onPress={() => handleAddToMyFavorite(locate)}>
            <Image
              source={require('../../assets/png/love.png')}
              style={styles.iconButton}
            />
            <Text style={styles.favText}>加入我的最愛</Text>
          </Pressable>

          <Pressable style={styles.action} onPress={handleTriggerNavigate}>
            <Image
              source={require('../../assets/png/map.png')}
              style={styles.iconButton}
            />
            <Text style={styles.buttonText}>開始導航</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagecontainer: {
    width: '100%',
    height: scale(250),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
    paddingVertical: 10,
  },
  image: {
    width: '90%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    flexWrap: 'wrap',
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  texttitle: {
    fontSize: 19,
    marginBottom: 18,
    fontFamily: 'Roboto-SemiBold',
  },
  cityName: {
    fontSize: 18,
    fontFamily: 'Roboto-ExtraBold',
    marginRight: 3,
  },
  textlong: {
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    lineHeight: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  favaction: {
    width: 140,
    backgroundColor: '#EA2525',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  action: {
    width: 140,
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  favText: {
    fontSize: 16,
    color: '#EEEEEE',
    fontFamily: 'Roboto-Bold',
  },
  buttonText: {
    fontSize: 17,
    color: '#EEEEEE',
    fontFamily: 'Roboto-Bold',
  },
  iconButton: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
});

export default Detail;

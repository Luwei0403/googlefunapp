import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {removeFavorite} from '../../src/reducers/myfavReducer';
import {scale} from 'react-native-size-matters';

const Favorites = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites); // Redux-persist 會自動載入

  const handlePressItem = item => {
    navigation.navigate('Detail', {data: item});
  };

  const handleRemoveFavorite = id => {
    dispatch(removeFavorite(id));
  };

  return (
    <ImageBackground
      source={require('../../assets/png/background4.png')}
      style={styles.background}
      resizeMode="cover">
      <View style={styles.container}>
        <Text style={styles.title}>我的最愛</Text>
        {favorites.length === 0 ? (
          <View style={{alignItems: 'center'}}>
            <Text style={styles.emptyText}>尚未收藏任何景點</Text>
            <Image
              source={require('../../assets/png/magnifier.png')}
              style={styles.magnifier}
            />
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}>
            {favorites.map(item => (
              <FavoriteItem
                key={item.caseId}
                item={item}
                onPress={() => handlePressItem(item)}
                onRemove={() => handleRemoveFavorite(item.caseId)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </ImageBackground>
  );
};

// ✅ **將 FavoriteItem 抽取成獨立元件**
const FavoriteItem = ({item, onPress, onRemove}) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardContent} onPress={onPress}>
        <Image
          source={{uri: item.representImage?.original}}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{item.caseName}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={onRemove}
        activeOpacity={0.65}>
        <Text style={styles.removeText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

// ✅ **樣式**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
    marginTop: 15,
  },
  emptyText: {
    fontSize: 20,
    color: '#606060',
    textAlign: 'center',
    fontFamily: 'Roboto-SemiBold',
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    marginTop: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scale(80),
    height: scale(80),
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'Roboto-ExtraBold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  removeButton: {
    backgroundColor: '#0093E9',
    paddingHorizontal: 4,
    borderRadius: 3,
    marginRight: 3,
    marginTop: 68,
  },
  removeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'Roboto-SemiBold',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  magnifier: {
    height: 58,
    width: 58,
    marginTop: 17,
  },
});

export default Favorites;

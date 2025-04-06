import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GET_Attractions} from '../actions/api/attractionsActions';
import {SET_ATTRACTIONS} from '../reducers/attractionsReducer';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const attractions = useSelector(state => state.attractions.attractions || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await GET_Attractions();
        if (Array.isArray(data)) {
          dispatch(SET_ATTRACTIONS(data));
        } else {
          console.error('Error fetching attractions:', data);
        }
      } catch (error) {
        console.error('API Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckDetail = marker => {
    navigation.navigate('Detail', {data: marker});
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 23.6978,
        longitude: 120.9605,
        latitudeDelta: 3,
        longitudeDelta: 3,
      }}>
      {attractions.map(marker => (
        <Marker
          key={marker.caseId}
          title={marker.caseName}
          description="點擊查看景點資訊"
          coordinate={{
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }}
          onCalloutPress={() => handleCheckDetail(marker)}
        />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
  },
});

export default Home;

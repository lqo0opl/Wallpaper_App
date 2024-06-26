import {
  Pressable,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {Style} from '../styles/Global';
import {useRoute} from '@react-navigation/native';

export default function ByColorScreen({navigation}) {
  const route = useRoute();
  const color = route.params?.color;

  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);

  const getWallpapers = async () => {
    try {
      const response = await fetch(
        `https://wallhaven.cc/api/v1/search?colors=${color}&page=${currentPage}`,
      );
      console.log(color);
      const json = await response.json();
      setData([...data, ...json.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWallpapers();
  }, [currentPage]);

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      contentStyle: {
        borderTopColor: `#${color}`,
        borderTopWidth: 3,
      },
      title: color,
    });
  }, [navigation]);

  const wallpapernumColumns = 3;
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }

    return data;
  };

  return (
    <View style={Style.pageContainer}>
      <View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            numColumns={wallpapernumColumns}
            data={formatData(data, wallpapernumColumns)}
            keyExtractor={({id}) => id}
            renderItem={({item}) => {
              if (item.empty === true) {
                return (
                  <View
                    style={[Style.wallpaperContainer, Style.invisiblecontainer]}
                  />
                );
              } else {
                return (
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ViewWallpaper', {
                        id: item.id,
                      })
                    }
                    style={Style.wallpaperContainer}>
                    <Image
                      style={Style.wallpaper}
                      source={{uri: item.thumbs.large}}
                    />
                  </Pressable>
                );
              }
            }}
            onEndReached={loadNextPage}
            onEndReachedThreshold={0}
          />
        )}
      </View>
    </View>
  );
}

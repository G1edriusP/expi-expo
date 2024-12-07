import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { createStyleSheet, UnistylesRuntime, useStyles } from "react-native-unistyles";
import MapView from "react-native-maps";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { MapPlaceItem, MapPlaceMarker } from "@/ui/components";
import { useCallback, useRef } from "react";

const Home = () => {
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList>(null);

  const { styles, theme } = useStyles(stylesheet);
  const places = useQuery(api.places.getAllPlaces);

  const animateToRegion = useCallback((latitude: number, longitude: number) => {
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  }, []);

  const handleMarkerPress = useCallback((longitude: number, latitude: number, index: number) => {
    animateToRegion(latitude, longitude);
    setTimeout(() => {
      listRef.current?.scrollToIndex({ index, animated: true });
    }, 300);
  }, []);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const { item } = viewableItems[0];
      animateToRegion(item.latitude, item.longitude);
    }
  }, []);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.mapContainer} userInterfaceStyle={UnistylesRuntime.themeName}>
        {places?.map((place, index) => (
          <MapPlaceMarker
            key={place._id}
            id={place._id}
            latitude={place.latitude}
            longitude={place.longitude}
            onPress={() => handleMarkerPress(place.longitude, place.latitude, index)}
          />
        ))}
      </MapView>
      <FlatList
        ref={listRef}
        style={styles.listContainer}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <MapPlaceItem item={item} />}
        data={places}
        horizontal
        ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
        ListFooterComponent={<View style={styles.listFooter} />}
        snapToAlignment="start"
        snapToInterval={Dimensions.get("window").width - theme.dimensions.size_12}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
    </View>
  );
};

export default Home;

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "flex-end",
    paddingBottom: theme.dimensions.size_12,
  },
  mapContainer: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    color: theme.colors.text,
    fontFamily: theme.fonts.bold,
  },
  listContainer: {
    maxHeight: 100,
    paddingHorizontal: theme.dimensions.size_12,
  },
  listFooter: {
    width: theme.dimensions.size_12,
  },
  listItemSeparator: {
    width: theme.dimensions.size_12,
  },
}));

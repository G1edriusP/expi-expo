import { Id } from "convex/_generated/dataModel";
import { memo } from "react";
import { Dimensions, Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface MapPlaceItemProps {
  item: {
    _id: Id<"places">;
    _creationTime: number;
    imageUrl?: string | undefined;
    description?: string | undefined;
    name: string;
    longitude: number;
    latitude: number;
    creatorId: string;
  };
}

const MapPlaceItem = memo((props: MapPlaceItemProps) => {
  const { item } = props;

  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.listItemContainer}>
      <Text style={styles.listItemTitle}>{item.name}</Text>
      {item.description ? <Text style={styles.listItemSubText}>{item.description}</Text> : null}
      <Text style={styles.listItemSubText}>
        {item.latitude} {item.longitude}
      </Text>
    </View>
  );
});

export default MapPlaceItem;

const stylesheet = createStyleSheet((theme) => ({
  listItemContainer: {
    backgroundColor: theme.colors.background,
    padding: theme.dimensions.size_16,
    borderRadius: theme.dimensions.size_8,
    width: Dimensions.get("window").width - theme.dimensions.size_12 * 2,
  },
  listItemTitle: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.dimensions.size_16,
    color: theme.colors.text,
  },
  listItemSubText: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.dimensions.size_12,
    color: theme.colors.text,
  },
}));

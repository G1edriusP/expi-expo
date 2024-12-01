import { memo } from "react";
import { Marker } from "react-native-maps";

interface MapPlaceMarkerProps {
  id: string;
  latitude: number;
  longitude: number;
  onPress: () => void;
}

const MapPlaceMarker = memo((props: MapPlaceMarkerProps) => {
  const { id, latitude, longitude, onPress } = props;

  return <Marker key={id} coordinate={{ latitude, longitude }} onPress={onPress} />;
});

export default MapPlaceMarker;

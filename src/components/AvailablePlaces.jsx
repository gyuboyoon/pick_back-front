import Places from "./Places.jsx";
import Error from "./Modal.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);

      // setAvailablePlacese(sortedPlaces);
      // setIsFetching(false);
    });
  });
}

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
    // setFetchedData: setAvailablePlacese,
  } = useFetch(fetchSortedPlaces, []);

  // useEffect(() => {
  //   async function fetchPlaces() {
  //     setIsFetching(true);

  //     try {
  //       const places = await fetchAvailablePlaces();

  //     } catch (error) {
  //       setError({
  //         message:
  //           error.message ||
  //           "장소를 불러오지 못했습니다. 나중에 다시 시도해주세요.",
  //       });
  //       setIsFetching(false);
  //     }
  //   }

  //   fetchPlaces();
  // }, []);

  if (error) {
    return <Error title="오류가 발생했습니다." message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="장소를 가져오고 있어요..!"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

import { useEffect } from "react";

function useFetch() {
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({
          message: error.message || "사용자의 장소를 가져오는데 실패했습니다!",
        });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);
}
// use로 시작하는 함수는 컴포넌트로 인식한다. 그 함수들에 특정 규칙을 부여하기 때문이다.

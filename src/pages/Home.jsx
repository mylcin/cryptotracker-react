import { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Banner from "../components/Banner";
import ErrorFallback from "../components/ErrorFallback";
const CoinsTable = lazy(() => import("../components/CoinsTable"));

function Home() {
  return (
    <>
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
        <Suspense fallback={<div>Loading...</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default Home;

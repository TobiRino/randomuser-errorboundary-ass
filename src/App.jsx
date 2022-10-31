import './App.css';
import Rout from '../router';
import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error }) {
  return (
    <div role="alert">
      <p>something went wrong</p>
      <pre>{error.message}</pre>
    </div>
  );
}

 export default function App() {
  return (
      <main>
      <ErrorBoundary FallbackComponent={Fallback}>
     <Rout/>
      </ErrorBoundary>
      
     
    </main>
  )
}
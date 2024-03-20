import { Routes, Route, Navigate } from "react-router-dom";
import { styled } from "styled-components";
import MainContent from "./components/MainContent";
import UploadContent from "./components/UploadContent";

const AppContainer = styled("div")({
  width: 1920,
  height: 1080,
})

function App() {
  return (
    <AppContainer>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/data/call/upload" element={<UploadContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContainer>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/app/Editor";
import EditorLayouts from "./layouts/EditorLayouts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorLayouts />}>
          {/* <Route index element={<Editor />} /> */}
          <Route path="/" element={<Editor />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

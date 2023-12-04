import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editor from "./pages/app/Editor";
import EditorLayouts from "./layouts/EditorLayouts";
import Home from "./pages/app/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/builder" element={<EditorLayouts />}>
          {/* <Route index element={<Editor />} /> */}
          <Route path="/builder" element={<Editor />} />
          <Route path="/builder/edit/:id" element={<Editor />} />

        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

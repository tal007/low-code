/*
 * @Date: 2022-09-21 14:58:21
 * @LastEditTime: 2023-09-02 15:06:25
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description:
 */

import { Loading } from "@/component/Loading";
import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Demo = lazy(() => import("@/page/Demo"));
const Layout = lazy(() => import("../layout/index"));
const Department = lazy(
  () =>
    import(
      "@/page/OrganizationalStructure/OrganizationManagementForZz/Department"
    )
);
const Editor = lazy(() => import("@/page/Editor"));
const EditorView = lazy(() => import("@/page/EditorView"));
const OA = lazy(() => import("@/page/OA"));
const Dimension = lazy(
  () =>
    import(
      "@/page/OrganizationalStructure/OrganizationManagementForZz/Dimension"
    )
);
const Login = lazy(() => import("@/page/Login"));
const PageError = lazy(() => import("@/page/PageError"));

const App: FC = () => {
  const { t } = useTranslation();

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor-view" element={<EditorView />} />
          <Route path="/oa" element={<OA />} />
          <Route path="/oa/:processId" element={<OA />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<OA />}>
          {/* <Route path="/" element={<Layout />}> */}
            <Route path="demo" element={<Demo />} />
            <Route path="org/">
              <Route path="department" element={<Department />} />
              <Route path="dimension" element={<Dimension />} />
            </Route>
          </Route>
          <Route
            path="/500"
            element={<PageError status={"500"} subTitle={t("status.500")} />}
          />
          <Route
            path="*"
            element={<PageError status={"404"} subTitle={t("status.404")} />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

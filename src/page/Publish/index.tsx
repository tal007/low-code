/*
 * @Date: 2022-09-21 17:59:59
 * @LastEditTime: 2023-04-19 15:21:03
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 编辑器线上版本
 */

import { Loading } from "@/component/Loading";
import { FC, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditorPublish as Editor } from "@/EditorPublish";

const EditorPublish: FC = () => {
  console.log("Editor publish");

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/publish" element={<Editor />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default EditorPublish;

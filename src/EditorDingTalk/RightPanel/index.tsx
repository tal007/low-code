/*
 * @Date: 2022-09-21 17:51:31
 * @LastEditTime: 2023-01-05 15:24:32
 * @LastEditors: 刘玉田
 * @Description: 右侧面板
 */

import { useEditor } from "@craftjs/core";
import styled from "styled-components";
import React from "react";
import { FlexBox } from "@/style";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  width: 300px;
  height: 100%;
`;

export const RightPanel = () => {
  const { t } = useTranslation();

  const { selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      const currentNode = state.nodes[currentNodeId];
      selected = {
        id: currentNodeId,
        name: currentNode.data.custom?.displayName || currentNode.data.name,
        settings: currentNode.related && currentNode.related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  // return isEnabled && selected ? (
  //   <Container>
  //     <ScrollContainer>
  //       {selected.settings && React.createElement(selected.settings)}
  //     </ScrollContainer>
  //   </Container>
  // ) : null;

  return (
    isEnabled && (
      <Container>
        {selected?.settings ? (
          React.createElement(selected?.settings)
        ) : (
          <FlexBox>{t("tip.selectWidget", { ns: "editor" })}</FlexBox>
        )}
      </Container>
    )
  );
};

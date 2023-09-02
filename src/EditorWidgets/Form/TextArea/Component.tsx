/*
 * @Date: 2023-05-05 09:17:24
 * @LastEditTime: 2023-05-15 12:24:47
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description:
 */
import { FormWidgetContainer } from "@/EditorWidgets/Common/FormWidgetContainer";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { TextAreaProps } from "./index.d";
import cx from "classnames";
import styled from "styled-components";
import { useDefaultValue } from "../../hooks";

const TextAreaContainer = styled.div`
  position: relative;
  .textArea {
    padding: 10px 10px 30px 10px;
    width: 100%;
    height: auto;
    outline: 0;
    resize: none;
    border-radius: 6px;
    border-color: #d9d9d9;
  }
  .textArea-mobile {
    border-width: 0;
  }
  .word-content {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #888;
  }
`;
const Component = (props: Partial<TextAreaProps>) => {
  const {
    platform,
    placeholder,
    onChange: onFormChange,
    defaultValue,
    totalWordNumber,
    enabled,
  } = props;
  const [currentWordNumber, setCurrentWordNumber] = useState<number>(0);
  const defaultShowValue = useDefaultValue(defaultValue, enabled);
  const [inputValue, setInputValue] = useState<string>(defaultShowValue);
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentTarget = e.currentTarget;
    const { value, clientHeight, scrollHeight } = currentTarget;
    if (scrollHeight > clientHeight) {
      currentTarget.style.height = scrollHeight + 5 + "px";
    }
    setCurrentWordNumber(value.replace(/\s/g, "").length);
    setInputValue(value);
    // setValue(value);
    onFormChange && onFormChange(value);
  };
  const keyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    const keyCode = e.code;
    if (keyCode === "Tab") {
      e.preventDefault();
      const textEl = e.currentTarget;
      const { selectionStart, selectionEnd, value } = textEl;
      const insertValue = "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"; //String.fromCharCode(keyCode);
      textEl.value =
        value.substring(0, selectionStart) +
        insertValue +
        value.substring(selectionEnd);
      const offsetEndPos = selectionStart + 8;
      textEl.focus();
      textEl.setSelectionRange(offsetEndPos, offsetEndPos);
    }
  };

  return (
    <FormWidgetContainer {...props} defaultValue={defaultShowValue}>
      <TextAreaContainer>
        <textarea
          className={cx([
            {
              textArea: true,
              "textArea-mobile": platform === "mobile",
            },
          ])}
          placeholder={placeholder}
          onKeyDown={keyDownHandler}
          onChange={onChange}
          rows={4}
          value={inputValue}
        ></textarea>
        {!enabled && (
          <span className="word-content">
            {currentWordNumber}/{totalWordNumber}
          </span>
        )}
      </TextAreaContainer>
    </FormWidgetContainer>
  );
};
export default Component;

/*
 * @Date: 2023-04-20 11:07:50
 * @LastEditTime: 2023-04-20 11:07:50
 * @LastEditors: 陈婷 wbyugqr@dingtalk.com
 * @Description: 文本说明组件
 */

import { TextLinkProps } from "./index.d";
import styled from "styled-components";
import { toColorString } from "../../helper";

const TextLink = styled.span<Partial<TextLinkProps>>`
  ${props => {
    const { color, fontFamily, fontSize, fontStyle, href } = props;
    const _color = toColorString(color);
    let textDecoration = fontStyle[2] ? "underline " : "";
    if (fontStyle[3]) {
      textDecoration += "line-through";
    }
    const linkStyle = href
      ? '&::after{content:"";display:inline-block;width:10px;height:10px;border-top:1px solid ' +
        _color +
        ";border-right:1px solid " +
        _color +
        ";transform:rotate(45deg);}"
      : "";
    const styleString = `
    font-family: ${fontFamily};
    font-size: ${fontSize}px;
    color:${_color};
    font-weight: ${fontStyle[0] ? "bold" : "normal"};
    font-style: ${fontStyle[1] ? "italic" : "normal"};
    text-decoration:${textDecoration};
    ${linkStyle}
    `;
    return styleString;
  }}
`;
const Component = (props: Partial<TextLinkProps>) => {
  const { href, description } = props;
  const goPage = () => {
    const reg = /^(http(s)?:\/\/)\w+/;
    window.open(reg.test(href) ? href : "http://" + href);
  };
  return (
    <>
      {href ? (
        <TextLink {...props} onClick={goPage}>
          {description}
        </TextLink>
      ) : (
        <TextLink {...props}>{description}</TextLink>
      )}
    </>
  );
};
export default Component;

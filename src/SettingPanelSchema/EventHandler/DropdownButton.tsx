/*
 * @Date: 2022-11-02 15:04:28
 * @LastEditTime: 2023-05-04 10:56:56
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 下拉按钮
 */
import { Button, Dropdown, MenuProps } from "antd";
import { ItemType } from "antd/lib/menu/hooks/useItems";

export interface DropdownButtonProps {
  items: ItemType[];
  handleMenuClick: (action: string) => void;
}

export const DropdownButton = (props: DropdownButtonProps) => {
  const { items, handleMenuClick } = props;
  const { t } = useTranslation();

  const onClick: MenuProps["onClick"] = e => {
    handleMenuClick(e.key);
  };

  return (
    <Dropdown menu={{ items, onClick }} trigger={["click"]}>
      <Button block type={"primary"}>
        {t("event.add")}
      </Button>
    </Dropdown>
  );
};

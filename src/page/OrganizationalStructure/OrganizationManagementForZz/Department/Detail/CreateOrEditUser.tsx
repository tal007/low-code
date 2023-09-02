/*
 * @Date: 2022-11-21 17:10:41
 * @LastEditTime: 2023-05-04 10:21:37
 * @LastEditors: 刘玉田 mrliu819@foxmail.com
 * @Description: 新增用户
 */

import {
  Modal,
  ModalProps,
  Tabs,
  Row,
  Col,
  Form,
  Input,
  Radio,
  DatePicker,
  Space,
  Button,
} from "antd";
import type { Tab } from "rc-tabs/lib/interface";

export type CreateNewUserProps = ModalProps;

export const CreateOrEditUser = (props: CreateNewUserProps) => {
  const { open, ...rest } = props;

  const items: Tab[] = [
    {
      key: "userInfo",
      label: "用户基本信息",
      children: <UserInformation />,
    },
    {
      key: "relationship",
      label: "关系定义",
      children: <Relationship />,
    },
    {
      key: "extra",
      label: "扩展属性",
      children: <Extra />,
    },
  ];

  return (
    <Modal
      width={"80%"}
      open={open}
      {...rest}
      title={"新增新用户"}
      destroyOnClose
      maskClosable={false}
      // keyboard={false}
      style={{
        overflow: "auto",
      }}
    >
      <Tabs items={items} />
    </Modal>
  );
};

const UserInformation = () => {
  return (
    <Form>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"姓名"}>
            <Input placeholder={"请输入姓名"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"账号"}>
            <Input placeholder={"请输入账号"} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"密码"}>
            <Input.Password placeholder={"请输入密码"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"密码"}>
            <Input.Password placeholder={"请确认密码"} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"主部门"}>
            <Input.Password placeholder={"请选择部门"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"用户类型"}>
            <Input.Password placeholder={"请选择用户类型"} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"状态"}>
            <Radio.Group>
              <Radio>在职</Radio>
              <Radio>离职</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"性别"}>
            <Radio.Group>
              <Radio>男</Radio>
              <Radio>女</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"入职时间"}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"离职时间"}>
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"手机"}>
            <Input.Password placeholder={"请输入手机号码"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"邮箱"}>
            <Input.Password placeholder={"请输入邮箱地址"} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"地址"}>
            <Input placeholder={"请输入地址"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"照片"}>
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"QQ号"}>
            <Input placeholder={"请输入QQ号"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"生日"}>
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col sm={{ span: 11 }}>
          <Form.Item label={"紧急联系人"}>
            <Input placeholder={"请输入紧急联系人"} allowClear />
          </Form.Item>
        </Col>
        <Col sm={{ span: 11, offset: 2 }}>
          <Form.Item label={"紧急联系人手机"}>
            <Input placeholder={"请输入紧急联系人手机号"} allowClear />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const Relationship = () => {
  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <Space>
        <Button type={"primary"}>添加关系</Button>
        <Button>删除关系</Button>
      </Space>
    </Space>
  );
};

const Extra = () => {
  return (
    <Space>
      <Button type={"primary"}>设置扩展属性</Button>
    </Space>
  );
};

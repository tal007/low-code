import type { DepartMentAndUserTreeItem as TreeNode } from "./OrgStructureTree";

export interface SelectItem {
  label: string;
  value: string;
}

export async function fetchList(searchName: string): Promise<SelectItem[]> {
  console.log("searchName", searchName);
  return fetch("https://randomuser.me/api/?results=5")
    .then(response => response.json())
    .then(body =>
      body.results.map(
        (user: {
          name: { first: string; last: string };
          login: { username: string };
        }) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        })
      )
    );
}

const url =
  "https://static.dingtalk.com/media/lADPDg7mP_2_7ETNBGbNBGU_1125_1126.jpg_620x10000q90.jpg";

export const Dulist: TreeNode[] = [
  {
    url,
    name: "篮球俱乐部1",
    id: 1,
    type: "Department",
    children: [
      {
        url,
        name: "篮球俱乐部2",
        id: 2,
        type: "Department",
        children: [
          {
            url,
            name: "篮球俱乐部3",
            id: 3,
            type: "Department",
            children: [
              {
                url,
                name: "篮球俱乐部4",
                id: 4,
                type: "Department",
                children: [],
              },
            ],
          },
        ],
      },
      {
        name: "李思思",
        type: "User",
        isCommander: true,
        id: 345,
      },
      {
        name: "江城",
        type: "User",
        isCommander: false,
        id: 34544,
      },
      {
        name: "周杰伦",
        type: "User",
        isCommander: false,
        id: 34543324,
      },
      {
        name: "蔡依林",
        type: "User",
        isCommander: false,
        id: 34511143324,
      },
      {
        name: "刘亦菲",
        type: "User",
        isCommander: false,
        id: 345111122243324,
      },
    ],
  },
];

/**
 * @author 梁强
 * @date 2023-05-15 星期一
 * @function 平铺树结构，方便根据 value（字符串） 获取到所有的 NodeItem 节点
 * @param {}
 * @return {}
 */
export function flattenTree(root: TreeNode[]): TreeNode[] {
  const res: TreeNode[] = [];

  function dfs(nodes: TreeNode[], parent: TreeNode | null = null) {
    if (!nodes) {
      return;
    }

    const newChildren: TreeNode[] = [];

    for (const element of nodes) {
      const node = element;
      const { children } = node;

      const newNode = {
        ...node,
        parent,
      };

      res.push(newNode);
      newChildren.push(newNode);
      if (children) {
        dfs(children, newNode);
      }
    }

    if (parent) {
      parent.children = newChildren;
    }
  }
  dfs(root);

  return res;
}

/**
 * @author 梁强
 * @date 2023-05-15 星期一
 * @function 是否有子节点（包括自己）被选中
 * @param {}
 * @return {}
 */
export function hasChildChecked(item: TreeNode, curValue: string[]): boolean {
  function dfs(node: TreeNode): boolean {
    if (!node) {
      return false;
    }

    const { value, children } = node;

    if (curValue.includes(value)) {
      return true;
    }
    if (!children) {
      return false;
    }
    return children.some((child: TreeNode) => dfs(child));
  }

  return dfs(item);
}

/**
 * @author 梁强
 * @date 2023-05-15 星期一
 * @function 是否有父节点（包括自己）被选中
 * @param {}
 * @return {}
 */
export function hasParentChecked(item: TreeNode, value: string[]): boolean {
  let tmp: TreeNode | null | undefined = item;

  while (tmp) {
    if (value.includes(tmp.value)) {
      return true;
    }

    tmp = tmp.parent;
  }

  return false;
}

/**
 * @author 梁强
 * @date 2023-05-15 星期一
 * @function 通过 value 查找树节点
 * @param {}
 * @return {}
 */
export function findNodeByValue(
  value: number,
  tree: TreeNode[]
): TreeNode | undefined {
  function findParent(nodes: TreeNode[]): TreeNode | undefined {
    if (!nodes) {
      return undefined;
    }
    for (const element of nodes) {
      const node = element;

      if (value === node.id) {
        return node;
      }
      if (node.children) {
        const foundInChildren = findParent(node.children);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
  }

  return findParent(tree);
}

/**
 * @author 梁强
 * @date 2023-05-15 星期一
 * @function 通过 value 某层节点
 * @param {}
 * @return {}
 */
export function findNodeLevelAllByValue(
  value: number | string,
  tree: TreeNode[],
  returnChildren = true
): TreeNode[] {
  function findParent(nodes: TreeNode[]): TreeNode[] {
    if (!nodes) {
      return [];
    }
    for (const element of nodes) {
      const node = element;

      if (value === node.id) {
        return returnChildren ? node?.children : nodes;
      }
      if (node.children) {
        const foundInChildren = findParent(node.children);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
  }

  return findParent(tree);
}

/**
 * @author 梁强
 * @date 2023-05-15 星期一
 * @function 组装节点成面包屑
 * @param {}
 * @return {}
 */
export function makeBreadcrumb(item: TreeNode) {
  let tmp: TreeNode | null = item;
  const makeBreadcrumbArr: TreeNode[] = [];
  while (tmp !== null) {
    makeBreadcrumbArr.unshift(tmp);
    tmp = tmp.parent;
  }

  return makeBreadcrumbArr;
}

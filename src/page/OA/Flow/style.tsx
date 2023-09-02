import styled from "styled-components";

export const NodeWrap = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 50px;
  position: relative;
`;

export const NodeWrapBox = styled.div`
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  flex-shrink: 0;
  background: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:not(.node-start)::before {
    content: "";
    position: absolute;
    top: -12px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    border-style: solid;
    border-width: 8px 6px 4px;
    border-color: #cacaca transparent transparent;
    background: #f5f5f7;
  }

  &::after {
    pointer-events: none;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;
    border-radius: 4px;
    border: 1px solid transparent;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  }

  &.active {
    &::after {
      border-color: #3296fa;
    }
  }

  &:hover {
    &::after {
      border-color: #3296fa;
    }

    .title {
      text-decoration: underline;

      .remove {
        visibility: visible;
      }
    }
  }

  .title {
    padding: 4px 16px;
    color: #ffffff;
    font-size: 12px;
    border-radius: 4px 4px 0px 0px;

    .remove {
      visibility: hidden;
    }

    .name {
      &:focus {
        padding: 0 10px;
        background: #fff;
        color: #000000;
        border-radius: 4px;
      }
    }
  }

  .content {
    padding: 16px;
  }
`;

export const ConditionWrap = styled.div`
  display: inline-flex;
  width: 100%;
`;

export const ConditionWrapBox = styled.div`
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 270px;
  width: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
`;

export const ConditionWrapBrachBox = styled.div`
  display: flex;
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 2px solid #cccccc;
  border-top: 2px solid #cccccc;
  position: relative;
  margin-top: 15px;

  .add-branch {
    border: none;
    outline: none;
    user-select: none;
    justify-content: center;
    font-size: 12px;
    padding: 0 10px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    color: #0089ff;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: center center;
    cursor: pointer;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

export const ColBox = styled.div`
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  background: #f5f5f7;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }
`;

export const TopLeftCoverLine = styled.div`
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  top: -2px;
  left: -1px;
`;

export const BottomLeftCoverLine = styled.div`
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  bottom: -2px;
  left: -1px;
`;

export const TopRightCoverLine = styled.div`
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  top: -2px;
  right: -1px;
`;

export const BottomRightCoverLine = styled.div`
  position: absolute;
  height: 3px;
  width: 50%;
  background-color: #f5f5f7;
  bottom: -2px;
  right: -1px;
`;

export const ConditionNode = styled.div`
  min-height: 220px;
  display: inline-flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
`;

export const ConditionNodeBox = styled.div`
  padding-top: 30px;
  padding-right: 50px;
  padding-left: 50px;
  -webkit-box-pack: center;
  justify-content: center;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  -webkit-box-flex: 1;
  flex-grow: 1;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 2px;
    height: 100%;
    background-color: #cacaca;
  }

  .condition-container {
    position: relative;
    width: 220px;
    min-height: 72px;
    background: #ffffff;
    border-radius: 4px;
    padding: 14px 19px;
    cursor: pointer;

    &::after {
      pointer-events: none;
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
      border-radius: 4px;
      border: 1px solid transparent;
      transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
    }

    &.active {
      &::after {
        border-color: #3296fa;
      }
    }

    &:hover {
      &::after {
        border-color: #3296fa;
      }
      .name {
        text-decoration: underline;
      }
      .priority {
        display: none;
      }
      .remove,
      .copy {
        display: initial;
      }

      .sort-left,
      .sort-right {
        display: flex;
      }
    }
  }

  .title {
    height: 20px;
    position: relative;
    font-size: 12px;
    text-align: left;
    line-height: 16px;
    color: rgba(25, 31, 37, 0.56);
  }

  .name:not(.default) {
    color: #15bc83;

    &:focus {
      padding: 0 10px;
    }
  }
  .copy {
    margin-right: 6px;
  }
  .remove,
  .copy {
    display: none;
  }

  .content {
    font-size: 14px;
    color: #191f25;
    text-align: left;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .sort {
    position: absolute;
    top: 0;
    bottom: 0;
    display: none;
    z-index: 1;
    font-size: 12px;
    color: rgba(25, 31, 37, 0.56);

    &:hover {
      background: #efefef;
      border-color: rgba(25, 31, 37, 0.08);
    }
  }

  .sort-left {
    left: 0;
    border-left: 1px solid #f6f6f6;
  }

  .sort-right {
    right: 0;
    border-right: 1px solid #f6f6f6;
  }
`;

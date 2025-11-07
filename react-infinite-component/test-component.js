// 这是一个简单的测试文件，用于测试自修改组件

// 定义组件
const SelfModifyingComponent = ({ count = 0 }) => {
  // 2. 5次渲染后停止
  if (count >= 5) {
    return `Rendering stopped after 5 renders`;
  }
  
  // 3. 实时修改自己的源代码
  // 我们将创建一个新的组件定义，它是当前组件的修改版本
  const ModifiedComponent = (props) => {
    return SelfModifyingComponent({ ...props, count: count + 1 });
  };
  
  // 1. 无限递归渲染
  // 4. 保持纯净：组件没有副作用
  
  return `Render Count: ${count + 1}
${ModifiedComponent()}`;
};

// 测试组件
console.log(SelfModifyingComponent({}));